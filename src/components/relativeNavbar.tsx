"use client";

import {
    useRef,
    createContext,
    useContext,
    MutableRefObject,
    useEffect,
} from "react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Modal, NavLink } from "@mantine/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const navContext = createContext<{
    navBarRef: MutableRefObject<HTMLElement | null>;
} | null>(null);

const DesktopNavBar = () => {

    return (
        <div className="container hidden sm:flex h-full w-full justify-between items-center text-lg text-gray-400 py-2 px-4 lg:px-2">
            <a href="/" className="text-xl text-gradient font-bold">
                Matthew Au-Yeung
            </a>
            <div className="flex gap-3 lg:gap-5 items-center">
                <a
                    href="/Resume.pdf"
                    target="_blank"
                    title="Resume"
                    className="text-gradient flex items-center gap-2"
                >
                    Resumé
                </a>
                <a
                    href="https://github.com/M4TTH3/Personal-Website"
                    title="GitHub Personal Website"
                    className="flex items-center"
                >
                    <FontAwesomeIcon icon={faGithub} className="h-6" />
                </a>
            </div>
        </div>
    );
};

const MobileNavBar = () => {
    const { navBarRef } = useContext(navContext)!;
    const [opened, { open, close, toggle }] = useDisclosure(false);

    useEffect(() => {
        // Close the mobile menu if the window is resized to a medium
        const closeIfMediumWidth = () => window.innerWidth > 640 && close();

        window.addEventListener("resize", closeIfMediumWidth);

        return () => window.removeEventListener("resize", closeIfMediumWidth);
    }, [close]);

    return (
        <>
            <div className="flex sm:hidden left-0 top-0 w-full h-full items-center justify-between px-4">
                <a
                    href="/"
                    className="text-xl text-gradient font-bold"
                >
                    Matthew Au-Yeung
                </a>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    color="white"
                    size="md"
                    aria-label="Toggle Menu"
                />
            </div>
            <div className=""></div>
            <Modal
                opened={opened}
                onClose={close}
                size="md"
                classNames={{
                    content:
                        "bg-gray-800 border border-gray-600 text-gradient font-bold bg-opacity-90 backdrop-blur-md",
                }}
                className="text-2xl"
                yOffset={
                    (navBarRef.current?.getBoundingClientRect().height ?? 0) *
                    1.5
                }
                withCloseButton={false}
            >
                <NavLink
                    variant="subtle"
                    href="/Resume.pdf"
                    label="Resume"
                    className="text-center"
                />
            </Modal>
        </>
    );
};

// Provides a Navbar that is relative to the page
export default function RelativeNavbar() {
    const ref = useRef<HTMLElement | null>(null);

    return (
        <nav
            ref={ref}
            id="navbar"
            className="relative h-16 sm:h-20 z-50 w-dvw bg-gray-400 bg-opacity-5 backdrop-blur-xl border-b-2 border-opacity-50 border-b-gray-400"
        >
            <navContext.Provider value={{ navBarRef: ref }}>
                <DesktopNavBar />
                <MobileNavBar />
            </navContext.Provider>
        </nav>
    );
}