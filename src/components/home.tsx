import StatsPanel from "./statsPanel";

export default async function Home() {
    console.log(process.env.DATABASE_URL);

    return (
        <section
            id="Home"
            className="container px-4 lg:px-2 py-16 mt-24 flex flex-col gap-5"
        >
            <h1 className="text-3xl sm:text-5xl text-gray-400 font-bold">
                I'm <span className="text-gradient">Matthew Au-Yeung</span>...
            </h1>
            <div className="relative min-h-[150px] overflow-hidden shadow-gray-500 shadow-sm rounded-lg">
                <div className="absolute border-2 border-gradient bg-gray-400 opacity-20 backdrop-blur-lg w-full h-full"></div>
                <StatsPanel />
            </div>
        </section>
    );
}
