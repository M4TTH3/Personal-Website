"use client";

import { Timeline, Text, List, Badge, Avatar } from "@mantine/core";

import Image from "next/image";
import { ReactNode } from "react";

const ToolBadge = ({ tool, icon }: { tool: string; icon?: ReactNode }) => {
    return (
        <Badge
            variant="gradient"
            gradient={{ from: "blue", to: "gray", deg: 45 }}
            leftSection={icon}
            className="opacity-90"
        >
            {tool}
        </Badge>
    );
};

const ResumeTopBadge = ({ text }: { text: string }) => {
  return (
      <Badge
          variant="gradient"
          gradient={{ from: "rgba(30, 30, 30, 1)", to: "gray", deg: 45 }}
      >
          {text}
      </Badge>
  );
};

const DateRangeBadge = ({ start, end }: { start: string; end: string }) => {
    return <ResumeTopBadge text={`${start} - ${end}`} />
};

interface TimelineResumeItemProps {
    title: string;
    bullet: ReactNode;
    companyName: string;
    location: string;
    startDate: string;
    endDate: string;
    points: Array<string>;
    tools?: Array<string>;
}

const TimelineResumeItem = ({
    title,
    bullet,
    companyName,
    location,
    startDate,
    endDate,
    points,
    tools
}: TimelineResumeItemProps
) => {
    const parseBold = (s: string): Array<string | ReactNode> => {
        const contents: Array<string | ReactNode> = [];
        let bold = false; // Whether we've reached a **
        let start = 0

        for (let i = 0; i < s.length; ++i) {
            const c = s[i];

            // We look one behind for **
            if (c === '*' && i > 0 && s[i - 1] === '*') {
                const tmp = s.substring(start, i - 1);
                if (bold) {
                    if (tmp !== "") contents.push(
                        <span className="bold-resume">
                            {tmp}
                        </span>
                    );

                    bold = false;
                    
                } else {
                    if (tmp !== "") contents.push(tmp);
                    bold = true;
                }

                start = i + 1; // Bold we start AFTER the *
            }
        }

        if (bold === true) throw Error("Invalid string for contents");
        if (start < s.length) contents.push(s.substring(start));

        return contents;
    }

    return (
        <Timeline.Item title={title} bullet={bullet}>
            <Text className="text-gray-50" c="dimmed" size="sm">
                {companyName}
            </Text>
            <div className="flex gap-1 mt-2">
                <DateRangeBadge start={startDate} end={endDate} />
                <ResumeTopBadge text={location} />
            </div>
            <List
                listStyleType="disc"
                className="mt-4 text-gray-300 w-full pr-2 sm:pr-0"
                size="sm"
            >
                {points.map((val, index) => {
                    // Parse ** ... ** as a bolded item
                    const contents = parseBold(val);

                    return (
                        <List.Item key={index}>
                            {contents.map((s) => s)}
                        </List.Item>
                    );
                })}
            </List>
            {tools && (
                <div className="mt-6 flex flex-wrap gap-1">
                    {tools.map((val, index) => (
                        <ToolBadge tool={val} key={index} />
                    ))}
                </div>
            )}
        </Timeline.Item>
    );
}

export default function Experiences() {
    return (
        <section
            id="Experiences"
            className="container mt-12 sm:mt-32 p-2 backdrop-blur-sm"
        >
            <h1 className="text-5xl font-bold text-gradient">Experiences</h1>
            <div className="mt-5 py-4 pr-3 sm:px-5 rounded-xl bg-opacity-5 bg-gray-400">
                <Timeline
                    bulletSize={60}
                    classNames={{
                        itemTitle: "text-2xl font-bold text-gradient",
                    }}
                >
                    <TimelineResumeItem
                        title="Incoming Software Engineer Intern"
                        bullet={
                            <Image
                                alt="Atomic Semi"
                                className="rounded-full"
                                height={50}
                                width={50}
                                src="/atomic_semi_logo.jpeg"
                            />
                        }
                        companyName="Atomic Semi"
                        location="San Francisco, CA"
                        startDate="May 2026"
                        endDate="Aug 2026"
                        points={[
                            "Fab Management Software",
                        ]}
                    />
                    <TimelineResumeItem
                        title="Software Engineer Intern"
                        bullet={
                            <Image
                                alt="Mechanical Orchard"
                                className="rounded-full"
                                height={50}
                                width={50}
                                src="/mo-logo.jpeg"
                            />
                        }
                        companyName="Mechanical Orchard"
                        location="Waterloo, ON"
                        startDate="Jan 2026"
                        endDate="Apr 2026"
                        points={[
                            "Code Generation team (Modernizing Mainframes)",
                        ]}
                        tools={["Java", "Compilers", "CVC5", "Claude"]}
                    />
                    <TimelineResumeItem
                        title="Compilers & Concurrency Research Assistant"
                        bullet={
                            <Image
                                alt="University of Waterloo"
                                className="object-contain"
                                fill
                                sizes="60px"
                                src="/uwaterloo-logo.png"
                            />
                        }
                        companyName="University of Waterloo"
                        location="Waterloo, ON"
                        startDate="Sept 2025"
                        endDate="Apr 2026"
                        points={[
                            "Cforall Compiler & Concurrency Primitives",
                        ]}
                        tools={["Cforall", "C++", "Compilers", "Concurrency"]}
                    />
                    <TimelineResumeItem
                        title="Software Engineer Intern"
                        bullet={
                            <Image
                                alt="Mechanical Orchard"
                                className="rounded-full"
                                height={50}
                                width={50}
                                src="/mo-logo.jpeg"
                            />
                        }
                        companyName="Mechanical Orchard"
                        location="Waterloo, ON"
                        startDate="May 2025"
                        endDate="Aug 2025"
                        points={[
                            "Code Generation team (Modernizing Mainframes)",
                        ]}
                        tools={["Python", "Kotlin", "Rust", "Spring", "gRPC", "Docker", "FastMCP"]}
                    />
                    <TimelineResumeItem
                        title="Software Developer Intern"
                        bullet={
                            <Image
                                alt="Ford Motors Company"
                                className="object-contain"
                                fill
                                sizes="60px"
                                src="/ford-motors.png"
                            />
                        }
                        companyName="Ford Motors Company"
                        location="Waterloo, ON"
                        startDate="Jan 2025"
                        endDate="Apr 2025"
                        points={[
                            "Projection team (CarPlay and Android Auto)",
                        ]}
                        tools={["Java", "Kotlin", "AOSP"]}
                    />
                    <TimelineResumeItem
                        title="Compilers Testing Research Assistant"
                        bullet={
                            <Image
                                alt="University of Waterloo"
                                className="object-contain"
                                fill
                                sizes="60px"
                                src="/uwaterloo-logo.png"
                            />
                        }
                        companyName="University of Waterloo"
                        location="Waterloo, ON"
                        startDate="May 2024"
                        endDate="Jan 2025"
                        points={[
                            "MIPS Assembly Runtime & Debugger"
                        ]}
                        tools={["Kotlin", "Lanterna", "Bazel", "MIPS"]}
                    />
                    <TimelineResumeItem
                        title="Software Developer Intern"
                        bullet={
                            <Image
                                alt="Centre Wellington"
                                className="object-contain"
                                fill
                                sizes="60px"
                                src="/centre-wellington-logo.png"
                            />
                        }
                        companyName="Township of Centre Wellington"
                        location="Fergus, ON"
                        startDate="May 2024"
                        endDate="Aug 2024"
                        points={[
                            "LSWIMS (Local Source Water Information Management System)"
                        ]}
                        tools={[
                            "C#",
                            "Typescript",
                            "ASP.NET Core",
                            "JQuery",
                            "Auth0",
                        ]}
                    />
                    <TimelineResumeItem
                        title="Data Science Intern"
                        bullet={
                            <Image
                                alt="Bio-Ag Consultants & Distributors"
                                className="rounded-xl"
                                height={50}
                                width={50}
                                src="/bio-ag-logo.png"
                            />
                        }
                        companyName="Bio-Ag Consultants & Distributors"
                        location="Wellesley, ON"
                        startDate="May 2023"
                        endDate="Aug 2023"
                        points={[
                            "Internal Sales & Inventory Management"
                        ]}
                        tools={[
                            "Python",
                            "Excel",
                            "Dynamics365",
                            "Google Maps API",
                        ]}
                    />
                    <TimelineResumeItem
                        title="Sales Associate"
                        bullet={
                            <Image
                                alt="McPhails Cycle & Sports Ltd."
                                className="rounded-xl"
                                height={50}
                                width={50}
                                src="/mcphails-logo.webp"
                            />
                        }
                        companyName="McPhail's Cycle & Sports Ltd."
                        location="Waterloo, ON"
                        startDate="May 2021"
                        endDate="Present"
                        points={[
                            "Bikes & Hockey !!!",
                        ]}
                    />
                </Timeline>
            </div>
        </section>
    );
}
