'use client';

import { useRef, useEffect } from "react";

export default function Galaxy() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const starCount = 200;

        const rand = (min: number, max: number) => 
            Math.floor(Math.random() * (max - min + 1) + min);

        let boxShadow = "";
        for (let i = 0; i < starCount; i++)
            boxShadow += `${boxShadow === "" ? "": ", "}${rand(-50, 50)}vw ${rand(-50, 50)}vh ${rand(0, 2)}px ${rand(0, 2)}px white`;

        ref.current?.style.setProperty("box-shadow", boxShadow);
    }, []);

    return (
        <div className="galaxy">
            <div className="star" ref={ref}></div>
        </div>
    );
}