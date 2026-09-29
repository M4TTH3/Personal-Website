import { spawn } from "child_process";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

// Prebuilt engines from github.com/M4TTH3/chess (web branch), named chess-<arch>-<libc>:
// "linux" is glibc, "alpine" is musl
const arch = { x64: "x86", arm64: "arm64" }[process.arch] ?? process.arch;
const libc = process.report.getReport().header.glibcVersionRuntime ? "linux" : "alpine";
const chessExecPath =
    process.env.CHESS_BIN ??
    path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "chess", `chess-${arch}-${libc}`);

const MAX_CONNECTIONS = parseInt(process.env.CHESS_MAX_CONNECTIONS ?? "20");
const SIDES = new Set(["white", "black"]);
const OPPONENTS = new Set(["human", "computer1", "computer2", "computer3", "computer4"]);
const MOVE = /^move [a-h][1-8] [a-h][1-8]$/;
const COMPUTER_DELAY_MS = 250;

const connections = new Set();
const children = new Set();
process.on("exit", () => children.forEach((child) => child.kill()));

export default function ChessServer(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:3000", "https://mattheway.com"],
            methods: ["GET", "POST"]
        },
        transports: ['websocket']
    });

    io.on('connection', (socket) => {
        if (connections.size >= MAX_CONNECTIONS) {
            console.log("Connection limit reached. Rejecting new connection.");
            socket.disconnect();
            return;
        }

        connections.add(socket.id);
        let child = null;

        const stop = () => {
            if (!child) return;
            children.delete(child);
            child.kill();
            child = null;
        };

        socket.on("start", (options) => {
            const side = options?.side;
            const opponent = options?.opponent;
            if (!SIDES.has(side) || !OPPONENTS.has(opponent)) return;

            stop();
            const game = spawn(chessExecPath);
            child = game;
            children.add(game);

            const computerSide = opponent === "human" ? null : side === "white" ? "black" : "white";

            game.on("error", (err) => {
                console.error("Chess engine failed:", err.message);
                socket.emit("data", { error: "Chess engine unavailable" });
                if (child === game) stop();
            });

            // The engine prints one JSON object per line
            readline.createInterface({ input: game.stdout }).on("line", (line) => {
                if (child !== game) return; // Output from a game that was restarted

                let data;
                try {
                    data = JSON.parse(line);
                } catch {
                    return;
                }
                socket.emit("data", data);

                // Ask the computer to play whenever it's its turn
                if (data.state === 0 && data.side === computerSide) {
                    setTimeout(() => child === game && game.stdin.write("move\n"), COMPUTER_DELAY_MS);
                }
            });

            game.stdin.on("error", () => {}); // Engine exited while we were writing
            game.on("exit", () => children.delete(game));

            game.stdin.write(`game ${side === "white" ? `human ${opponent}` : `${opponent} human`}\n`);
        });

        socket.on("move", (move) => {
            if (typeof move === "string" && (MOVE.test(move) || move === "resign")) child?.stdin.write(move + "\n");
        });

        socket.on("disconnect", () => {
            connections.delete(socket.id);
            stop();
        });
    });
};
