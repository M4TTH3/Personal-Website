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
                className="container px-4 lg:px-2 mt-4 sm:mt-20 pb-20"
            >
                <h1 className="text-5xl text-gradient">How this works?</h1>
                <p className="text-red-700">
                    Code upon request. Due University of Waterloo Policy, the
                    C++ code is not public. React code is available on GitHub.
                </p>
                <div className="flex gap-1 mt-4 flex-wrap">
                    <Badge>C++</Badge>
                    <Badge>Typescript</Badge>
                    <Badge>Next.js</Badge>
                    <Badge>Socket.IO</Badge>
                    <Badge>Design Patterns</Badge>
                </div>
                <div className="relative h-72 sm:h-96">
                    <Image
                        src="/ChessPersonal.png"
                        alt="High Level Overview"
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-full">
                    <h2 className="text-3xl sm:mt-10">Features</h2>
                    <div className="relative w-full flex flex-col sm:flex-row gap-5 mt-3">
                        <p className="sm:flex-[1] text-sm">
                            This is a visualization of the C++ Chess Game
                            created for the CS246 course. It offers 4 computer
                            levels, human vs human. The game is played in
                            real-time with Socket.IO and the compiled game.
                            <br />
                            <br />
                            <span className="text-gray-600">
                                This is the Xwindow view on Ubuntu.
                            </span>
                        </p>
                        <div className="relative sm:flex-[1] h-96 flex justify-end">
                            <Image
                                src="/chess-xwindow.png"
                                alt="Original XWindow Chess Game"
                                height={384}
                                width={384}
                            />
                        </div>
                    </div>
                </div>
                <div className="relative h-96 sm:h-[800px] mt-3 sm:mt-10">
                    <Image
                        src="/uml.png"
                        alt="An intricate UML diagram of the entire structure"
                        fill
                        className="h-96"
                    />
                </div>
            </section>
        </main>
    );
}