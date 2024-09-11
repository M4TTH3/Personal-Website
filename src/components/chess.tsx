"use client";

import { socket } from "@/sockets/chessSocket";
import { Button, Select } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

interface ChessGameJSON {
    check?: boolean;
    chessboard?: number[][];
    side?: "white" | "black";
    state?: 0 | 1 | 2 | 3;
    error?: string;
}

interface ChessGameOptions {
    side: "white" | "black";
    opponent: "computer1" | "computer2" | "computer3" | "computer4" | "human";
}

const ChessPiece = ({
    piece,
    clicked,
    loc,
    curSide
}: {
    piece: number;
    clicked: string | null;
    loc: string;
    curSide?: "white" | "black";
} & React.HTMLProps<React.ReactElement>) => {
    const ref = useRef<HTMLDivElement>(null);
    const getPieceUnicode = (char: string): string => {
        switch (char) {
            case "n":
            case "N":
                return "♞";
            case "b":
            case "B":
                return "♝";
            case "q":
            case "Q":
                return "♛";
            case "k":
            case "K":
                return "♚";
            case "p":
            case "P":
                return "♟";
            case "r":
            case "R":
                return "♜";
            default:
                return "";
        }
    };

    const char = String.fromCharCode(piece);

    useEffect(() => {
        if (ref.current) {
            const black = char === char.toLowerCase();
            const side = black ? 'black' : 'white';
            
            if (curSide === side && clicked === loc) ref.current.style.color = black ? "#4B0082" : "#D8BFD8";
            else ref.current.style.color = side;
        }
    }, [clicked, ref, curSide]);

    return (
        <span
            ref={ref}
        >
            {getPieceUnicode(char)}
        </span>
    );
};

export default function ChessGame() {
    const [sending, setSending] = useState(false);
    const [clicked, setClicked] = useState<string | null>(null);
    const [options, setOptions] = useState<ChessGameOptions>({
        side: "white",
        opponent: "computer4",
    });
    const [game, setGame] = useState<ChessGameJSON>({});
    const overlayRef = useRef<HTMLDivElement>(null);
 
    const updateClicked = (key: string) => {
        if (sending) return;

        setClicked(prev => {
            if (prev && prev !== key) {
                setSending(true);
                socket.emit('move', `move ${prev} ${key}`);
                return null;
            }
            return prev === key ? null : key;
        });
    };

    const numberToChessCoordinate = (num: number): string => {
        const files = "abcdefgh";
        const rank = 8 - Math.floor(num / 8);
        const file = files[num % 8];
        return `${file}${rank}`;
    };

    useEffect(() => {
        socket.on("data", (data: ChessGameJSON) => {
            if (data.error) {
                setClicked(null);
                setSending(false);
                return;
            }
            setGame(data);
        });
    }, [setGame, setClicked, setSending]);

    useEffect(() => {
        setSending(prev => {
            if (prev && options.opponent !== "human") socket.emit("move", "move")
            return false;
        });

        overlayRef.current!.style.display = "none";
        if (game.state === 1 || game.state === 2 || socket.disconnected) {
            overlayRef.current!.style.display = "flex";
            overlayRef.current!.firstChild!.textContent = socket.disconnected
                ? "Waiting for connection..."
                : game?.state === 1
                ? game?.side === "white"
                    ? "Black wins!"
                    : "White wins!"
                : "Stalemate!";
            return;
        }
    }, [game, setSending, socket.disconnected]);

    const start = () => {
        socket.emit("start", options);
        setClicked(null);
    };

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-full sm:w-[80%] flex gap-3 sm:gap-5">
                <Select
                    data={["White", "Black"]}
                    defaultValue={"White"}
                    placeholder="Select your side"
                    className="flex-[1]"
                    onChange={(side) =>
                        setOptions({
                            ...options,
                            side: side!.toLowerCase() as "white" | "black",
                        })
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
                    onChange={(opponent) =>
                        setOptions({
                            ...options,
                            opponent: opponent!.toLowerCase() as
                                | "computer1"
                                | "computer2"
                                | "computer3"
                                | "computer4"
                                | "human",
                        })
                    }
                />
                <Button
                    variant="gradient"
                    gradient={{ from: "indigo", to: "gray", deg: 90 }}
                    type="button"
                    onClick={start}
                >
                    Start
                </Button>
            </div>
            <div className="relative w-full sm:w-[80%] aspect-square">
                <div
                    id="ChessBoard"
                    className="w-full h-full border-2 border-gray"
                >
                    {Array.from({ length: 64 }).map((_, i) => (
                        <div
                            key={numberToChessCoordinate(i)}
                            className={`tile w-100 h-100 flex items-center justify-center text-4xl sm:text-6xl bg-opacity-40 ${
                                i % 2 === Math.floor(i / 8) % 2
                                    ? "bg-gray-300"
                                    : "bg-gray-600"
                            } cursor-pointer`}
                            onClick={() =>
                                updateClicked(numberToChessCoordinate(i))
                            }
                        >
                            {game.chessboard && (
                                <ChessPiece
                                    loc={numberToChessCoordinate(i)}
                                    clicked={clicked}
                                    curSide={game.side}
                                    key={
                                        game.chessboard[Math.floor(i / 8)][
                                            i % 8
                                        ]
                                    }
                                    piece={
                                        game.chessboard[Math.floor(i / 8)][
                                            i % 8
                                        ]
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div
                    ref={overlayRef}
                    className="absolute left-0 top-0 size-full z-30 bg-opacity-80 bg-gray-700 flex justify-center items-center"
                >
                    <span className="text-center text-gradient text-5xl"></span>
                </div>
            </div>
        </div>
    );
}
