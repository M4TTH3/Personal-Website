"use client";

import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SegmentedControl } from "@mantine/core";
import { useState } from "react";

type Control = {
    label: string;
    value: string;
    icon?: IconDefinition;
    icon_link?: string;
};
export type Controls = Array<Control>;

// Label is displayed
// Value is the ID of the segment
interface StatsControlProps {
    data: Controls;
}

export default function StatsPanelControl({ data }: StatsControlProps) {
    const [current, setCurrent] = useState<Control>(data[0]);

    const toggleDisplay = (id: string) => {
        const el = document.getElementById(id)!;

        // First disable all of the elements
        data.forEach((segment) => {
            document.getElementById(segment.value)!.style.display = "none";
            if (segment.value === id) setCurrent(segment);
        });

        el.style.display = "flex";
    };

    return (
        <div className="relative pt-4 pb-2 px-4 flex justify-between items-center sm:items-baseline">
            <SegmentedControl
                classNames={{
                    root: "bg-gray-400 shadow-gray-300 shadow-sm",
                }}
                color="gray"
                withItemsBorders={false}
                data={data}
                onChange={toggleDisplay}
            />
            <a
                className="z-10 cursor-pointer"
                href={current.icon_link ?? ""}
                target="_blank"
            >
                {current.icon && current.icon_link && (
                    <FontAwesomeIcon
                        icon={current.icon}
                        className="h-6"
                        color="orange"
                    />
                )}
            </a>
        </div>
    );
}
