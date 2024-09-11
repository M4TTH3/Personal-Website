import { spawn } from "child_process";
import path from "path";
import { Server } from "socket.io";

const chessExecPath = path.resolve('./', 'chessExec'); // Place the chess program into the same directory

const MAX_CONNECTIONS = parseInt(process.env.CHESS_MAX_CONNECTIONS ?? "20");
let activeConnections = 0;

export default function ChessServer(httpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
        if (activeConnections >= MAX_CONNECTIONS) {
            console.log("Connection limit reached. Rejecting new connection.");
            socket.disconnect();
            return;
        }

        activeConnections++;
        
        let child = null;

        process.on('exit', () => child?.kill()); // Safety cleanup

        try {
            const writeMove = (data) => {
                child.stdin?.write(data + "\n");
            }

            const start = (data) => {
                child?.kill();
                child = spawn(chessExecPath);
                
                const side = data.side;
                const opponent = data.opponent;
                const startGame = "game " + (side === 'white' ? `human ${opponent}`: `${opponent} human`);
                
                child.stdout?.on("data", (data) => {
                    socket.emit("data", JSON.parse(data.toString()))
                });

                socket.off("move", writeMove).on("move", writeMove);

                child.stdin?.write(startGame + "\n");
            };

            socket.on("start", start);

            socket.on("disconnect", () => {
                console.log('disconnecting');
                activeConnections--;
                child?.kill();
            });
        } catch {
            activeConnections--;
            child?.kill();
            socket.disconnect();
        }
    });
};