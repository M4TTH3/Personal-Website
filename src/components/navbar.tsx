
// Going to use a server side rendered component to render the navbar

import { ReactHTMLElement } from "react";

const DesktopNavBar = () => {
    return (
        <div className="hidden sm:flex h-full w-full justify-around items-center text-lg text-gray-400">
            <a href="#Home" className="text-xl text-gradient">
                Matthew Au-Yeung
            </a>
            <div className="flex gap-3 lg:gap-5">
                <a href="#Projects">Projects</a>
                <a href="#Experiences">Experiences</a>
                <a href="#About">About</a>
                <a href="#Contact">Contact</a>
            </div>
        </div>
    );
}

const MobileNavBar = () => {
    return (
        <div>
            
        </div>
    );
}

export default function Navbar() {

    return (
        <nav id="navbar" className="sticky h-20 w-full bg-gray-400 bg-opacity-5 backdrop-blur-lg border-b-2 border-opacity-50 border-b-gray-400 p-2 px-4">
            <DesktopNavBar />
            <MobileNavBar />
        </nav>
    );
}