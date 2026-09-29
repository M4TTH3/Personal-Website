import ChessGame from "@/components/chess";
import RelativeNavbar from "@/components/relativeNavbar";
import { Badge } from "@mantine/core";
import Image from "next/image";

export default function Chess() {

    return (
        <main>
            <RelativeNavbar />
            <section
                id="ChessSection"
                className="container pt-5 sm:pt-12 px-4 lg:px-2"
            >
                <ChessGame />
            </section>
            <section
                id="Info"
                className="container px-4 lg:px-2 mt-12 sm:mt-24 pb-20 flex flex-col gap-12"
            >
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gradient">How it works</h1>
                    <p className="text-gray-300 max-w-3xl">
                        A C++ chess engine I built with two teammates for CS 246 at the
                        University of Waterloo, originally drawn in an X11 window. Here it
                        runs on the server and streams every move to your browser in real time.
                    </p>
                    <div className="flex gap-1 flex-wrap">
                        {["C++20", "TypeScript", "Next.js", "Socket.IO", "Docker", "Design Patterns"].map((t) => (
                            <Badge key={t} variant="light" color="gray">{t}</Badge>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-gray-200">Architecture</h2>
                    <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-3">
                        {[
                            ["Browser", "React board sends moves like “move e2 e4” over a WebSocket."],
                            ["Socket.IO server", "Node.js starts one engine process per game and relays its output."],
                            ["C++ engine", "Validates the move, lets the computer reply, and prints the board as JSON."],
                        ].map(([title, body], i) => (
                            <div key={title} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 flex-1">
                                {i > 0 && <span className="text-gray-500 text-xl rotate-90 md:rotate-0">→</span>}
                                <div className="flex-1 w-full p-4 rounded-xl border border-gray-700 bg-gray-400 bg-opacity-5 backdrop-blur-sm">
                                    <p className="text-xs text-gray-500">0{i + 1}</p>
                                    <h3 className="font-bold text-gray-100">{title}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        [
                            "Full rules",
                            "Castling, en passant, promotion, check, checkmate, stalemate and insufficient material. Every move is checked against a standalone rules module, tested against python-chess over millions of positions.",
                        ],
                        [
                            "Four computer levels",
                            "Level 1 plays random legal moves. Level 2 prefers captures and checks. Level 3 also escapes threats. Level 4 adds an opening book.",
                        ],
                        [
                            "Observer pattern",
                            "Every square is observed by the pieces that attack it, so a move only notifies the pieces it affects instead of rescanning the board.",
                        ],
                        [
                            "Decorator pattern",
                            "Pieces decorate the empty square beneath them. A capture stacks one piece on another, and removing it restores the square.",
                        ],
                    ].map(([title, body]) => (
                        <div key={title} className="p-5 rounded-xl border border-gray-700 bg-gray-400 bg-opacity-5 backdrop-blur-sm">
                            <h3 className="font-bold text-gray-100">{title}</h3>
                            <p className="text-sm text-gray-400 mt-2">{body}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <figure className="flex flex-col gap-2">
                        <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-gray-700 bg-black">
                            <Image
                                src="/chess-xwindow.png"
                                alt="The original chess game drawn in an X11 window"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                            />
                        </div>
                        <figcaption className="text-sm text-gray-500">The original X11 version on Ubuntu.</figcaption>
                    </figure>
                    <figure className="flex flex-col gap-2">
                        <a
                            href="/uml.png"
                            target="_blank"
                            className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-gray-700 bg-white block"
                        >
                            <Image
                                src="/uml.png"
                                alt="UML class diagram of the chess engine"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                            />
                        </a>
                        <figcaption className="text-sm text-gray-500">Class diagram. Click to open full size.</figcaption>
                    </figure>
                </div>

                <p className="text-sm text-gray-500">
                    The C++ source is private under University of Waterloo policy, and available on request.
                    The website and this page are on{" "}
                    <a href="https://github.com/M4TTH3/Personal-Website" target="_blank" className="underline hover:text-gray-300">
                        GitHub
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}