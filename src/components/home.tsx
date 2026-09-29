import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatsPanel from "./statsPanel";

const HeroLink = ({ href, icon, label }: { href: string; icon: IconDefinition; label: string }) => (
    <a
        href={href}
        target="_blank"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-600 bg-gray-400 bg-opacity-5 text-sm text-gray-300 hover:border-gray-300 hover:text-white transition-colors"
    >
        <FontAwesomeIcon icon={icon} className="h-3.5" />
        {label}
    </a>
);

export default async function Home() {
    return (
        <section
            id="Home"
            className="container px-4 lg:px-2 py-16 mt-8 sm:mt-24 flex flex-col gap-5"
        >
            <div className="flex flex-col gap-3">
                <p className="text-lg sm:text-xl text-gray-400">
                    Hi, I&apos;m <span className="text-gradient font-bold">Matthew Au-Yeung</span>
                </p>
                <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
                    <span className="text-gradient">
                        If it doesn&apos;t challenge you,
                        <br />
                        it won&apos;t change you.
                    </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                    Computer Science @ University of Waterloo · Software Engineer Intern @ Mechanical Orchard
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                    <HeroLink href="https://github.com/M4TTH3" icon={faGithub} label="GitHub" />
                    <HeroLink
                        href="https://www.linkedin.com/in/matthew-au-yeung-652195263/"
                        icon={faLinkedinIn}
                        label="LinkedIn"
                    />
                    <HeroLink href="/Resume.pdf" icon={faFile} label="Resume" />
                </div>
            </div>
            <div className="relative min-h-[150px] overflow-hidden shadow-gray-700 shadow-sm rounded-lg">
                <div className="absolute bg-gray-400 bg-opacity-10 backdrop-blur-md w-full h-full"></div>
                <StatsPanel />
            </div>
        </section>
    );
}
