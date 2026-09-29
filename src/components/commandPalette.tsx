"use client";

import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { faGithub, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
    faBriefcase,
    faChessKnight,
    faEnvelope,
    faFile,
    faHouse,
    faMagnifyingGlass,
    faShapes,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Same offset as the navbar links so sections aren't hidden under the fixed nav
const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const navHeight = document.getElementById("navbar")?.getBoundingClientRect().height ?? 0;
    window.scrollTo({ top: element.offsetTop - navHeight * 1.5, behavior: "smooth" });
};

const icon = (i: IconDefinition) => <FontAwesomeIcon icon={i} className="h-4 w-4 text-gray-400" />;

const section = (id: string, description: string, i: IconDefinition): SpotlightActionData => ({
    id,
    label: id,
    description,
    leftSection: icon(i),
    onClick: () => scrollToId(id),
});

const link = (id: string, label: string, description: string, href: string, i: IconDefinition): SpotlightActionData => ({
    id,
    label,
    description,
    leftSection: icon(i),
    onClick: () => window.open(href, href.startsWith("/") ? "_self" : "_blank"),
});

const actions = [
    {
        group: "Sections",
        actions: [
            section("Home", "Back to the top", faHouse),
            section("Projects", "Things I've built", faShapes),
            section("Experiences", "Where I've worked", faBriefcase),
            section("About", "A bit about me", faUser),
            section("Contact", "Send me a message", faEnvelope),
        ],
    },
    {
        group: "Links",
        actions: [
            link("resume", "Resume", "Open my resume (PDF)", "/Resume.pdf", faFile),
            link("chess", "Chess", "Play chess against my engine", "/chess", faChessKnight),
            link("github", "GitHub", "github.com/M4TTH3", "https://github.com/M4TTH3", faGithub),
            link("linkedin", "LinkedIn", "Connect with me", "https://www.linkedin.com/in/matthew-au-yeung-652195263/", faLinkedinIn),
            link("instagram", "Instagram", "@matt_ay04", "https://www.instagram.com/matt_ay04", faInstagram),
        ],
    },
];

export default function CommandPalette() {
    return (
        <Spotlight
            actions={actions}
            shortcut={["mod + K", "/"]}
            nothingFound="Nothing found..."
            highlightQuery
            scrollable
            maxHeight={420}
            searchProps={{
                leftSection: icon(faMagnifyingGlass),
                placeholder: "Search...",
            }}
            classNames={{
                content: "bg-gray-800 bg-opacity-90 backdrop-blur-md border border-gray-600",
                search: "bg-transparent text-gray-100 border-gray-600",
                actionsGroup: "text-gray-400",
                action: "text-gray-200 data-[selected=true]:bg-gray-700 hover:bg-gray-700",
                actionDescription: "text-gray-400",
                empty: "text-gray-400",
            }}
        />
    );
}
