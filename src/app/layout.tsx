import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/galaxy.css";
import "@/styles/globals.css";
import Galaxy from "@/components/galaxy";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <div className="relative">
                    <Galaxy />
                    <div className="w-dvw h-dvh overflow-y-scroll backdrop-blur-sm z-10 relative text-white">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
