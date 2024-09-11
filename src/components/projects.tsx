import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "@mantine/core";
import Image from "next/image";
import { HTMLProps } from "react";

interface ProjectCardProps {
    title: string;
    tools: string[];
    image: string | IconDefinition;
    link: string;
}

const ProjectCard = ({
    title,
    tools,
    image,
    link,
    ...props
}: ProjectCardProps & HTMLProps<HTMLAnchorElement>) => {
    return (
        <a {...props} href={link}>
            <div className="group cursor-pointer h-52 lg:h-72 border-t-[1.5px] border-t-slate-300 bg-opacity-5 bg-gray-400 rounded-lg backdrop-blur-sm shadow-gray-300 shadow-md flex flex-col p-4">
                <div className="absolute z-10 left-0 top-0 h-full w-full bg-black opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex justify-center items-center">
                    <div className="w-[70%] flex flex-wrap gap-1 justify-center">
                        {tools.map((tool) => {
                            return (
                                <Badge
                                    size="md"
                                    variant="gradient"
                                    gradient={{
                                        from: "blue",
                                        to: "gray",
                                        deg: 90,
                                    }}
                                    key={tool}
                                >
                                    {tool}
                                </Badge>
                            );
                        })}
                    </div>
                </div>
                <div className="relative flex-[4] p-2 overflow-hidden">
                    {typeof image === "string" ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-contain"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={image}
                            className="h-full w-full text-gray-500 text-opacity-50"
                        />
                    )}
                </div>
                <div className="relative flex-[1] flex align-text-bottom text-3xl font-bold text-gradient">
                    <span className="self-end">{title}</span>
                </div>
            </div>
        </a>
    );
};

export default function Projects() {
    return (
        <section
            id="Projects"
            className="container sm:mt-12 px-4 lg:px-2 flex gap-8 sm:gap-16 flex-col sm:flex-row"
        >
            <div className="flex-[1] flex flex-col gap-8 sm:gap-16">
                <ProjectCard
                    title="Course Connect"
                    tools={[
                        "React Native",
                        "FastAPI",
                        "Websockets",
                        "PostgreSQL",
                        "Auth0",
                    ]}
                    image="/courseconnect.png"
                    link="https://github.com/M4TTH3/CourseConnect"
                />
                <ProjectCard
                    title="Study Where"
                    tools={[
                        "Next.js",
                        "Flask",
                        "MapBox",
                        "CosmosDb",
                        "Azure AD B2C",
                    ]}
                    image="/studywhere.png"
                    link="https://studywhere.ca"
                />
            </div>
            <div className="flex-[1] flex flex-col gap-8 sm:gap-16 sm:mt-12">
                <ProjectCard
                    title="Chess"
                    tools={["C++", "XWindow", "Next.js", "Socket.io"]}
                    image="/chess.png"
                    link="/chess"
                />
                <ProjectCard
                    title="Poster Scan"
                    tools={["React", "Flask", "OpenCV", "QReader"]}
                    image="/posterscan.png"
                    link="https://github.com/M4TTH3/PosterScan"
                />
            </div>
        </section>
    );
}
