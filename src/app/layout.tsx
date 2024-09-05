import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Galaxy from "@/components/galaxy";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications"

import "@mantine/core/styles.css"; // Ensure it's before our styles
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/galaxy.css";
import "@/styles/globals.css";

const ubuntu = Ubuntu({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Matthew Au-Yeung Personal Site",
    description:
        "I am Matthew Au-Yeung, a 3A Computer Science student at the University of Waterloo.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`${ubuntu.className} overflow-x-hidden w-dvw h-dvh`}>
                <div className="relative">
                    <Galaxy />
                    <div className="absolute z-10 w-dvw h-dvh backdrop-blur-[1px]"></div>
                    <div className="absolute w-dvw h-dvh z-20 text-white">
                        <MantineProvider>
                            <Notifications />
                            {children}
                        </MantineProvider>
                    </div>
                </div>
            </body>
        </html>
    );
}
