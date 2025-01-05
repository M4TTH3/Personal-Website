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
                        title="Software Developer"
                        bullet={
                            <Image
                                alt="Ford Motors Company"
                                className="object-contain"
                                fill
                                src="/ford-motors.png"
                            />
                        }
                        companyName="Ford Motors Company"
                        location="Waterloo, ON"
                        startDate="Jan 2025"
                        endDate="Present"
                        points={[
                            "Developing mobile integration features for Ford's Infotainment system using Kotlin",
                        ]}
                        tools={["Kotlin", "AOSP"]}
                    />
                    <TimelineResumeItem
                        title="Compilers Research Assistant"
                        bullet={
                            <Image
                                alt="University of Waterloo"
                                className="object-contain"
                                fill
                                src="/uwaterloo-logo.png"
                            />
                        }
                        companyName="University of Waterloo"
                        location="Waterloo, ON"
                        startDate="May 2024"
                        endDate="Jan 2025"
                        points={[
                            "Developed a Kotlin-based **MIPS assembly runtime environment** used annually by **over 1,000 students** for the Compilers Foundation course",
                            "Engineered a **graphical command-line MIPS debugger** in Kotlin that supports stepping, breakpoints, I/O, and processor state visuals, reducing course Piazza queries by **60%**",
                            "Built a compiler for an educational language implementing **20%** of C’s functionality, targeting MIPS assembly",
                            "Created an ANTLR grammar for TopFormFlat file minimization (a bracket-nesting newline limit) by abstracting common CFG rules, expanding support from only C to **9 languages**",
                        ]}
                        tools={["Kotlin", "Lanterna", "Bazel", "MIPS"]}
                    />
                    <TimelineResumeItem
                        title="Software Developer"
                        bullet={
                            <Image
                                alt="Centre Wellington"
                                className="object-contain"
                                fill
                                src="/centre-wellington-logo.png"
                            />
                        }
                        companyName="Township of Centre Wellington"
                        location="Fergus, ON"
                        startDate="May 2024"
                        endDate="Aug 2024"
                        points={[
                            "Shipped **10 full-stack MVC pages** to manage and interact with **over 1,000,000 rows** of government data, using C# ASP.NET Core, Entity Framework, SQL Server, and JQuery",
                            "Implemented policy-based authorization with controller middleware to enforce access across **28 municipalities**",
                            "Improved communication for **100+ officials** by developing real-time notes using SignalR Websockets and Quill.js",
                            "Integrated Github Actions for automated deployment to **Azure App Service**; improved build speed by **50%** via Webpack-based TypeScript transpilation and bundling",
                        ]}
                        tools={[
                            "C#",
                            "ASP.NET Core",
                            "JQuery",
                            "Typescript",
                            "SignalR Websockets",
                            "Auth0",
                        ]}
                    />
                    <TimelineResumeItem
                        title="Data Science & Administrative Assistant"
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
                            "Implemented Python scripts to streamline access to company metrics, sales, and inventory from Dynamics365, saving **over 3 hours daily** of manual data logging",
                            "Analyzed inventory datasets of over **10,000** items to uncover **$30,000** in losses due to manufacturing errors",
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
                            "Actively assist customers with purchases from a selection of **20** bicycle brands, parts, and hockey equipment",
                        ]}
                    />
                </Timeline>
            </div>
        </section>
    );
}
