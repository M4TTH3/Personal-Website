"use client";

import { useRef, createContext, useContext, MutableRefObject, useEffect } from "react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Button, Modal, NavLink } from "@mantine/core";

const navContext = createContext<{
    scrollToId: (e: React.MouseEvent, id: string) => void;
    navBarRef: MutableRefObject<HTMLElement | null>;
} | null>(null);

const DesktopNavBar = () => {
    const { scrollToId } = useContext(navContext)!;

    return (
        <div className="container hidden sm:flex h-full w-full justify-between items-center text-lg text-gray-400 py-2 px-4 lg:px-2">
            <a
                href="#Home"
                className="text-xl text-gradient font-bold"
                onClick={(e) => scrollToId(e, "Home")}
            >
                Matthew Au-Yeung
            </a>
            <div className="flex gap-3 lg:gap-5">
                <a href="#Projects" onClick={(e) => scrollToId(e, "Projects")}>
                    Projects
                </a>
                <a
                    href="#Experiences"
                    onClick={(e) => scrollToId(e, "Experiences")}
                >
                    Experiences
                </a>
                <a href="#Contact" onClick={(e) => scrollToId(e, "Contact")}>
                    Contact
                </a>
                <a
                    href="/Resume.pdf"
                    target="_blank"
                    title="Resume"
                    className="text-gradient"
                >
                    Resumé
                </a>
            </div>
        </div>
    );
};

const MobileNavBar = () => {
    const { scrollToId, navBarRef } = useContext(navContext)!;
    const [opened, { open, close, toggle }] = useDisclosure(false);

    const scrollTo = (e: React.MouseEvent, id: string) => {
        scrollToId(e, id);
        close();
    };

    useEffect(() => {
        // Close the mobile menu if the window is resized to a medium
        const closeIfMediumWidth = () => window.innerWidth > 640 && close();

        window.addEventListener('resize', closeIfMediumWidth);

        return () => window.removeEventListener('resize', closeIfMediumWidth);
    }, [close])

    return (
        <>
            <div className="flex sm:hidden left-0 top-0 w-full h-full items-center justify-between px-4">
                <a
                    href="#Home"
                    className="text-xl text-gradient font-bold"
                    onClick={(e) => scrollToId(e, "Home")}
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
                    content: "bg-gray-800 border border-gray-600 text-gradient font-bold bg-opacity-90 backdrop-blur-md",
                }}
                className="text-2xl"
                yOffset={(navBarRef.current?.getBoundingClientRect().height ?? 0) * 1.5}
                withCloseButton={false}
            >
                <NavLink
                    variant="subtle"
                    href="#Home"
                    label="Home"
                    className="text-center"
                    onClick={(e) => scrollTo(e, "Home")}
                />
                <NavLink
                    variant="subtle"
                    href="#Projects"
                    label="Projects"
                    className="text-center"
                    onClick={(e) => scrollTo(e, "Projects")}
                />
                <NavLink
                    variant="subtle"
                    href="#Experiences"
                    label="Experiences"
                    className="text-center"
                    onClick={(e) => scrollTo(e, "Experiences")}
                />
                <NavLink
                    variant="subtle"
                    href="#Contact"
                    label="Contact"
                    className="text-center"
                    onClick={(e) => scrollTo(e, "Contact")}
                />
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

export default function Navbar() {
    const ref = useRef<HTMLElement | null>(null);

    const scrollToId = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id)!;
        const navHeight = ref.current?.getBoundingClientRect().height ?? 0;

        window.scrollTo({
            top: element.offsetTop - navHeight * 1.5,
            behavior: "smooth",
        });
    };

    return (
        <nav
            ref={ref}
            id="navbar"
            className="fixed top-0 left-0 h-16 sm:h-20 z-50 w-dvw bg-gray-400 bg-opacity-5 backdrop-blur-xl border-b-2 border-opacity-50 border-b-gray-400"
        >
            <navContext.Provider value={{ scrollToId, navBarRef: ref }}>
                <DesktopNavBar />
                <MobileNavBar />
            </navContext.Provider>
        </nav>
    );
}
