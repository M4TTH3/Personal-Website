"use client";

import { Button, Select } from "@mantine/core";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
    process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3001",
    {
        transports: ["websocket"],
        upgrade: false
    }
);

type Side = "white" | "black";
type Opponent = "computer1" | "computer2" | "computer3" | "computer4" | "human";

interface ChessGameJSON {
    check?: boolean;
    chessboard?: number[][]; // Rank 8 first; each entry is a char code
    side?: Side; // Side to move
    state?: 0 | 1 | 2 | 3; // 0 = playing, 1 = checkmate, 2 = draw
    error?: string;
}

interface ChessGameOptions {
    side: Side;
    opponent: Opponent;
}

const PIECE_UNICODE: Record<string, string> = {
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    p: "♟",
    r: "♜",
};

const FILES = "abcdefgh";

const pieceAt = (game: ChessGameJSON, square: string): string | null => {
    if (!game.chessboard) return null;
    const file = FILES.indexOf(square[0]);
    const rank = Number(square[1]);
    const char = String.fromCharCode(game.chessboard[8 - rank][file]);
    return char.toLowerCase() in PIECE_UNICODE ? char : null;
};

const pieceSide = (piece: string): Side => (piece === piece.toLowerCase() ? "black" : "white");

const ALL_SQUARES = Array.from({ length: 64 }, (_, i) => `${FILES[i % 8]}${8 - Math.floor(i / 8)}`);

// Where each piece that moved came from, keyed by its new square. Also the squares that changed.
const diffBoards = (before: ChessGameJSON, after: ChessGameJSON) => {
    const arrived: string[] = [];
    const vacated: string[] = [];
    for (const sq of ALL_SQUARES) {
        const b = pieceAt(before, sq);
        const a = pieceAt(after, sq);
        if (a && a !== b) arrived.push(sq);
        else if (b && !a) vacated.push(sq);
    }

    const from: Record<string, string> = {};
    for (const to of arrived) {
        const piece = pieceAt(after, to)!;
        // Same piece, or a pawn that promoted
        const i = vacated.findIndex((sq) => {
            const p = pieceAt(before, sq)!;
            return p === piece || (p.toLowerCase() === "p" && pieceSide(p) === pieceSide(piece));
        });
        if (i >= 0) from[to] = vacated.splice(i, 1)[0];
    }

    return { from, changed: new Set([...arrived, ...Object.values(from), ...vacated]) };
};

const ChessPiece = ({ piece, lifted }: { piece: string; lifted: boolean }) => (
    <span className={`chess-piece ${pieceSide(piece)} ${lifted ? "lifted" : ""}`}>
        {PIECE_UNICODE[piece.toLowerCase()]}
    </span>
);

export default function ChessGame() {
    // Starts false to match the server render; the effect below syncs the real state
    const [connected, setConnected] = useState(false);
    const [clicked, setClicked] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<ChessGameOptions>({
        side: "white",
        opponent: "computer4",
    });
    // Options of the game being played, so changing the selects mid-game doesn't flip the board
    const [playing, setPlaying] = useState<ChessGameOptions | null>(null);
    const [game, setGame] = useState<ChessGameJSON>({});
    const [lastMove, setLastMove] = useState<{ from: Record<string, string>; changed: Set<string>; id: number }>({
        from: {},
        changed: new Set(),
        id: 0,
    });
    const gameRef = useRef<ChessGameJSON>({});

    useEffect(() => {
        const onData = (data: ChessGameJSON) => {
            if (data.error) {
                setError(data.error === "Chess engine unavailable" ? data.error : "Illegal move");
                setClicked(null);
                return;
            }
            setError(null);

            // The engine also reprints the board when nothing moved (e.g. before the computer plays)
            const previous = gameRef.current;
            if (previous.chessboard) {
                const diff = diffBoards(previous, data);
                if (diff.changed.size) setLastMove((m) => ({ ...diff, id: m.id + 1 }));
            }
            gameRef.current = data;
            setGame(data);
        };
        const connect = () => setConnected(true);
        const disconnect = () => setConnected(false);

        socket.on("data", onData);
        socket.on("connect", connect);
        socket.on("disconnect", disconnect);
        setConnected(socket.connected); // May have connected before this mounted

        return () => {
            socket.off("data", onData);
            socket.off("connect", connect);
            socket.off("disconnect", disconnect);
        };
    }, []);

    // Clear the illegal move message after a moment
    useEffect(() => {
        if (!error) return;
        const timeout = setTimeout(() => setError(null), 2000);
        return () => clearTimeout(timeout);
    }, [error]);

    const inProgress = game.state === 0;
    const vsComputer = playing !== null && playing.opponent !== "human";
    // Against the computer you only move your own side; against a human, whoever's turn it is
    const myTurn = inProgress && (!vsComputer || game.side === playing?.side);
    const flipped = playing?.side === "black";

    const onSquareClick = (square: string) => {
        if (!myTurn) return;

        const piece = pieceAt(game, square);
        const ownPiece = piece !== null && pieceSide(piece) === game.side;

        if (clicked === square) {
            setClicked(null);
        } else if (ownPiece) {
            setClicked(square); // Select, or switch to another of our pieces
        } else if (clicked) {
            socket.emit("move", `move ${clicked} ${square}`);
            setClicked(null);
        }
    };

    const start = () => {
        socket.emit("start", options);
        setPlaying(options);
        gameRef.current = {};
        setGame({});
        setLastMove((m) => ({ from: {}, changed: new Set(), id: m.id + 1 }));
        setClicked(null);
        setError(null);
    };

    // Screen position of a square, accounting for the board being flipped
    const displayPos = (square: string) => {
        const col = FILES.indexOf(square[0]);
        const row = 8 - Number(square[1]);
        return flipped ? { col: 7 - col, row: 7 - row } : { col, row };
    };

    const squares = Array.from({ length: 64 }, (_, i) => {
        const row = flipped ? 7 - Math.floor(i / 8) : Math.floor(i / 8);
        const col = flipped ? 7 - (i % 8) : i % 8;
        return {
            square: `${FILES[col]}${8 - row}`,
            light: (row + col) % 2 === 0,
            showRank: i % 8 === 0,
            showFile: Math.floor(i / 8) === 7,
        };
    });

    const overlay = !connected
        ? "Waiting for connection..."
        : !playing
          ? "Press Start to play"
          : game.state === 1
            ? game.side === "white"
                ? "Black wins!"
                : "White wins!"
            : game.state === 2
              ? "Draw!"
              : null;

    const status = !inProgress
        ? null
        : error
          ? error
          : !myTurn
            ? "Computer is thinking..."
            : `${game.side === "white" ? "White" : "Black"} to move${game.check ? " — check!" : ""}`;

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="dark-inputs w-full max-w-[560px] flex gap-3">
                <Select
                    data={["White", "Black"]}
                    defaultValue={"White"}
                    placeholder="Select your side"
                    className="flex-[1]"
                    allowDeselect={false}
                    classNames={{ dropdown: "dark-dropdown" }}
                    onChange={(side) =>
                        side && setOptions({ ...options, side: side.toLowerCase() as Side })
                    }
                />
                <Select
                    data={[
                        "Computer4",
                        "Computer3",
                        "Computer2",
                        "Computer1",
                        "Human",
                    ]}
                    defaultValue={"Computer4"}
                    placeholder="Select Your Opponent"
                    className="flex-[1]"
                    allowDeselect={false}
                    classNames={{ dropdown: "dark-dropdown" }}
                    onChange={(opponent) =>
                        opponent && setOptions({ ...options, opponent: opponent.toLowerCase() as Opponent })
                    }
                />
                <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "gray", deg: 90 }}
                    type="button"
                    onClick={start}
                    disabled={!connected}
                >
                    Start
                </Button>
            </div>
            <p className={`h-6 text-lg ${error ? "text-red-400" : "text-gray-300"}`}>{status}</p>
            <div className="relative w-full max-w-[560px] aspect-square rounded-lg overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-gray-700">
                <div id="ChessBoard" className="w-full h-full">
                    {squares.map(({ square, light, showRank, showFile }) => {
                        const piece = pieceAt(game, square);
                        const from = lastMove.from[square];
                        const inCheck =
                            game.check && piece?.toLowerCase() === "k" && pieceSide(piece) === game.side;

                        let slide: CSSProperties | undefined;
                        if (from) {
                            const a = displayPos(from), b = displayPos(square);
                            slide = { "--dx": a.col - b.col, "--dy": a.row - b.row } as CSSProperties;
                        }

                        return (
                            <div
                                key={square}
                                className={[
                                    "chess-square",
                                    light ? "light" : "dark",
                                    lastMove.changed.has(square) ? "last-move" : "",
                                    clicked === square ? "selected" : "",
                                    inCheck ? "in-check" : "",
                                    myTurn ? "cursor-pointer" : "",
                                ].join(" ")}
                                onClick={() => onSquareClick(square)}
                            >
                                {showRank && <span className="coord rank">{square[1]}</span>}
                                {showFile && <span className="coord file">{square[0]}</span>}
                                {piece && (
                                    <div
                                        // Remount on each move so the slide animation replays
                                        key={from ? `${lastMove.id}` : "static"}
                                        className={`chess-piece-layer ${from ? "moving" : ""}`}
                                        style={slide}
                                    >
                                        <ChessPiece piece={piece} lifted={clicked === square} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {overlay && (
                    <div className="chess-overlay absolute inset-0 z-30 bg-gray-900/75 backdrop-blur-[2px] flex justify-center items-center">
                        <span className="text-center text-gradient text-4xl sm:text-5xl font-bold">{overlay}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
