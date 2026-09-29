import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Provides a Navbar that is relative to the page
export default function RelativeNavbar() {
    return (
        <nav
            id="navbar"
            className="relative h-16 sm:h-20 z-50 w-dvw bg-gray-400 bg-opacity-5 backdrop-blur-xl border-b-2 border-opacity-50 border-b-gray-400"
        >
            <div className="container flex h-full w-full justify-between items-center text-lg text-gray-400 py-2 px-4 lg:px-2">
                <a href="/" className="text-xl text-gradient font-bold">
                    Matthew Au-Yeung
                </a>
                <a
                    href="https://github.com/M4TTH3/Personal-Website"
                    title="GitHub Personal Website"
                    className="flex items-center hover:text-gray-200 transition-colors"
                >
                    <FontAwesomeIcon icon={faGithub} className="h-6" />
                </a>
            </div>
        </nav>
    );
}
