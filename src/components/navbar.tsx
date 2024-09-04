
// Going to use a server side rendered component to render the navbar

import { ReactHTMLElement } from "react";

const DesktopNavBar = () => {
    return (
        <div className="container hidden sm:flex h-full w-full justify-between items-center text-lg text-gray-400 py-2 px-4 lg:px-2">
            <a href="#Home" className="text-xl text-gradient font-bold">
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
        <nav id="navbar" className="fixed top-0 left-0 h-20 z-50 w-full bg-gray-400 bg-opacity-5 backdrop-blur-lg border-b-2 border-opacity-50 border-b-gray-400">
            <DesktopNavBar />
            <MobileNavBar />
        </nav>
    );
}