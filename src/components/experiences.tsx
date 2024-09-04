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

export default function Experiences() {
    return (
        <section
            id="Experiences"
            className="container mt-4 sm:mt-32 p-2 backdrop-blur-sm"
        >
            <h1 className="text-5xl font-bold text-gradient">Experiences</h1>
            <div className="mt-5 py-4 pr-3 sm:px-5 rounded-xl bg-opacity-5 bg-gray-400">
                <Timeline
                    bulletSize={60}
                    classNames={{
                        itemTitle: "text-2xl font-bold text-gradient",
                    }}
                >
                    <Timeline.Item
                        title="Software Developer"
                        bullet={
                            <Image
                                alt="Centre Wellington"
                                className="object-contain"
                                fill
                                src="/centre-wellington-logo.png"
                            />
                        }
                    >
                        <Text className="text-gray-50" c="dimmed" size="sm">
                            Township of Centre Wellington - Source Water
                            Protection
                        </Text>
                        <div className="flex gap-1 mt-2">
                            <DateRangeBadge start="May 2024" end="Aug 2024" />
                            <ResumeTopBadge text="Fergus, ON" />
                        </div>
                        <List
                            listStyleType="disc"
                            className="mt-4 text-gray-300 w-full"
                            size="sm"
                        >
                            <List.Item>
                                Developed features for an internal app used
                                by&nbsp;
                                <span className="bold-resume">
                                    28 municipalities
                                </span>{" "}
                                to track and protect source water
                            </List.Item>
                            <List.Item>
                                Redesigned{" "}
                                <span className="bold-resume">
                                    app security
                                </span>{" "}
                                and built an admin portal to dynamically create
                                and manage permissions for&nbsp;
                                <span className="bold-resume">300+ users</span>
                            </List.Item>
                            <List.Item>
                                Implemented a live{" "}
                                <span className="bold-resume">
                                    collaborative text editor
                                </span>
                                , supporting custom embeds with{" "}
                                <span className="bold-resume">20+ layouts</span>{" "}
                                and reports using{" "}
                                <span className="italic">
                                    SignalR Websockets
                                </span>{" "}
                                and <span className="italic">Quill.js</span>
                            </List.Item>
                            <List.Item>
                                Streamlined CI/CD with Typescript transpilation
                                via Webpack, and automated testing with
                                Playwright and xUnit
                            </List.Item>
                        </List>
                        <div className="mt-6 flex flex-wrap gap-1">
                            <ToolBadge tool="C#" />
                            <ToolBadge tool="ASP.NET Core" />
                            <ToolBadge tool="JQuery" />
                            <ToolBadge tool="Typescript" />
                            <ToolBadge tool="SignalR Websockets" />
                            <ToolBadge tool="AUTH0" />
                        </div>
                    </Timeline.Item>
                    <Timeline.Item
                        title="Research Developer"
                        bullet={
                            <Image
                                alt="University of Waterloo"
                                className="object-contain"
                                fill
                                src="/uwaterloo-logo.png"
                            />
                        }
                    >
                        <Text className="text-gray-50" c="dimmed" size="sm">
                            University of Waterloo
                        </Text>
                        <div className="flex gap-1 mt-2">
                            <DateRangeBadge start="May 2024" end="Present" />
                            <ResumeTopBadge text="Waterloo, ON" />
                        </div>
                        <List
                            listStyleType="disc"
                            className="mt-4 text-gray-300 w-full"
                            size="sm"
                        >
                            <List.Item>
                                Developed using Kotlin a MIPS Assembly{" "}
                                <span className="bold-resume">
                                    runtime environment
                                </span>{" "}
                                used annually by over{" "}
                                <span className="bold-resume">
                                    1,000 students
                                </span>{" "}
                                for the CS241 course
                            </List.Item>
                            <List.Item className="w-50">
                                Integrated a text-based user interface debugger
                                with{" "}
                                <span className="bold-resume">Lanterna</span>,
                                featuring a paneled layout that supports{" "}
                                <span className="bold-resume">stepping</span>,{" "}
                                <span className="bold-resume">breakpoints</span>
                                ,{" "}
                                <span className="bold-resume">watchpoints</span>
                                , and data visualizations
                            </List.Item>
                        </List>
                        <div className="mt-6 flex flex-wrap gap-1">
                            <ToolBadge tool="Kotlin" />
                            <ToolBadge tool="Lanterna" />
                            <ToolBadge tool="Bash" />
                            <ToolBadge tool="Bazel" />
                        </div>
                    </Timeline.Item>
                    <Timeline.Item
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
                    >
                        <Text className="text-gray-50" c="dimmed" size="sm">
                            Bio-Ag Consultants & Distributors
                        </Text>
                        <div className="flex gap-1 mt-2">
                            <DateRangeBadge start="May 2023" end="Aug 2023" />
                            <ResumeTopBadge text="Wellesley, ON" />
                        </div>
                        <List
                            listStyleType="disc"
                            className="mt-4 text-gray-300 w-full"
                            size="sm"
                        >
                            <List.Item>
                                Implemented custom APIs to streamline access to
                                company metrics, sales, and inventory from{" "}
                                <span className="bold-resume">Dynamics365</span>{" "}
                                . This initiative resulted in significant time
                                savings, equivalent to{" "}
                                <span className="bold-resume">3+ hours</span>{" "}
                                per day
                            </List.Item>
                            <List.Item>
                                Analyzed inventory datasets of over{" "}
                                <span className="bold-resume">10,000</span>{" "}
                                items to uncover{" "}
                                <span className="bold-resume">$30,000</span> in
                                losses due to manufacturing errors
                            </List.Item>
                        </List>
                        <div className="mt-6 flex flex-wrap gap-1">
                            <ToolBadge tool="Dynamics365" />
                            <ToolBadge tool="Python" />
                            <ToolBadge tool="Google Maps API" />
                            <ToolBadge tool="Excel" />
                        </div>
                    </Timeline.Item>
                    <Timeline.Item
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
                        lineVariant="dotted"
                    >
                        <Text className="text-gray-50" c="dimmed" size="sm">
                            McPhail's Cycle & Sports Ltd.
                        </Text>
                        <div className="flex gap-1 mt-2">
                            <DateRangeBadge start="May 2021" end="Present" />
                            <ResumeTopBadge text="Waterloo, ON" />
                        </div>
                        <List
                            listStyleType="disc"
                            className="mt-4 text-gray-300 w-full"
                            size="sm"
                        >
                            <List.Item>
                                Actively cater to customers with questions and
                                concerns, and purchases from a selection of{" "}
                                <span className="bold-resume">300+</span>{" "}
                                different bicycles, parts, and hockey equipment
                            </List.Item>
                        </List>
                        <div className="mt-6 flex flex-wrap gap-1"></div>
                    </Timeline.Item>
                </Timeline>
            </div>
        </section>
    );
}
