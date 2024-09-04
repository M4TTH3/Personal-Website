'use client';

import { Timeline, Text, Code, List } from "@mantine/core";

import { Roboto, Merriweather } from "next/font/google";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"] });

export default function Experiences() {

    

    return (
        <section
            id="Experiences"
            className="container mt-4 sm:mt-32 p-2 backdrop-blur-sm"
        >
            <h1 className="text-5xl font-bold text-gradient">Experiences</h1>
            <Timeline
                bulletSize={40}
                color="red"
                classNames={{
                    itemTitle: "text-2xl font-bold text-gradient",
                }}
                className={`${merriweather.className} mt-10`}
            >
                <Timeline.Item
                    className="text-white"
                    title="Software Developer"
                >
                    <Text className="text-white" c="dimmed" size="sm">
                        Township of Centre Wellington - Source Water Protection
                    </Text>
                    <List listStyleType="disc" className="mt-2 text-gray-300">
                        <List.Item>
                            Developed features for an internal app used by&nbsp;
                            <span className="font-bold">
                                28 municipalities
                            </span>{" "}
                            to track and protect source water
                        </List.Item>
                        <List.Item>
                            Redesigned{" "}
                            <span className="font-bold">app security</span> and
                            built an admin portal to dynamically create and
                            manage permissions for&nbsp;
                            <span className="font-bold">300+ users</span>
                        </List.Item>
                        <List.Item>
                            Implemented a live{" "}
                            <span className="font-bold">
                                collaborative text editor
                            </span>
                            , supporting custom embeds with{" "}
                            <span className="font-bold">20+ layouts</span> and
                            reports using{" "}
                            <span className="italic">SignalR Websockets</span>{" "}
                            and <span className="italic">Quill.js</span>
                        </List.Item>
                        <List.Item>
                            Streamlined CI/CD with Typescript transpilation via
                            Webpack, and automated testing with Playwright and
                            xUnit
                        </List.Item>
                    </List>
                    <Code>
                        React | Node.js | Express | PostgreSQL | Leaflet.js
                    </Code>
                </Timeline.Item>
                <Timeline.Item title="Research Developer">
                    <Text className="text-white" c="dimmed" size="sm">
                        University of Waterloo
                    </Text>
                </Timeline.Item>
            </Timeline>
        </section>
    );
}