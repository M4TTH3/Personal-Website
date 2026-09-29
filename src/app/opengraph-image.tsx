import { ImageResponse } from "next/og";

export const alt = "Matthew Au-Yeung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview card, rendered at build time
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: "radial-gradient(circle at 80% 20%, #1f2530, #000 60%)",
                    color: "#f7f7f7",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 36, color: "#9aa3b0" }}>Hi, I&apos;m</div>
                <div style={{ fontSize: 88, fontWeight: 700, marginTop: 8 }}>Matthew Au-Yeung</div>
                <div style={{ fontSize: 40, color: "#c9ced6", marginTop: 32 }}>
                    If it doesn&apos;t challenge you, it won&apos;t change you.
                </div>
                <div style={{ fontSize: 28, color: "#808a98", marginTop: 48 }}>
                    Computer Science @ Waterloo · mattheway.com
                </div>
            </div>
        ),
        size
    );
}
