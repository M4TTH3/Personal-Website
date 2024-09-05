import { faGithub, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Footer() {

    const logoClass = "h-6 p-2 bg-gradient rounded-xl";

    return (
        <footer className="h-48 bg-black border-t-4 border-gray-900">
            <div className="container px-2 py-4">
                <div>
                    <h3 className="text-2xl text-gradient">Matthew Au-Yeung</h3>
                    <h4 className="text-md text-gradient">
                        mw2auyeu@uwaterloo.ca
                    </h4>
                    <div className="flex gap-3 mt-3 items-center">
                        <a href="https://www.linkedin.com/in/matthew-au-yeung-652195263/">
                            <FontAwesomeIcon
                                icon={faLinkedinIn}
                                className={logoClass}
                            />
                        </a>
                        <a href="https://github.com/M4TTH3">
                            <FontAwesomeIcon
                                icon={faGithub}
                                className={logoClass}
                            />
                        </a>
                        <a href="https://www.instagram.com/matt_ay04">
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className={logoClass}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}