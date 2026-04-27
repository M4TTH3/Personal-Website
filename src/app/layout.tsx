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
    title: "Matthew Au-Yeung - Personal Website",
    description: "Hi, I'm Matthew, a 4th year Computer Science student at the University of Waterloo. I love to learn new things, and I'm always looking for new challenges. I'm interested in distributed systems, languages & compilers, and AI. I'm currently an intern at Mechanical Orchard, working on creating tools and a platform for quickly and safely modernizing mainframes.",
    keywords: ["Matthew Au-Yeung", "Computer Science", "University of Waterloo", "Mechanical Orchard", "Modernizing Mainframes"],
    authors: [{ name: "Matthew Au-Yeung", url: "https://mattheway.com" }],
    creator: "Matthew Au-Yeung",
    publisher: "Matthew Au-Yeung",
    applicationName: "Matthew Au-Yeung Personal Website",
    openGraph: {
        title: "Matthew Au-Yeung Personal Website",
        description: "Hi, I'm Matthew, a 4th year Computer Science student at the University of Waterloo. I love to learn new things, and I'm always looking for new challenges. I'm interested in distributed systems, languages & compilers, and AI.",
        url: "https://mattheway.com",
        siteName: "Matthew Au-Yeung Personal Website",
        images: [
            {
                url: "/photo.jpg",
                width: 1200,
                height: 630,
                alt: "Matthew Au-Yeung",
            },
        ],
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
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
