import Contact from "@/components/email";
import Experiences from "@/components/experiences";
import Home from "@/components/home";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import NavWatch from "@/hooks/navWatch";
import { NavigationProgress } from "@mantine/nprogress";

export default function Root() {

    return (
        <>
            <header>
                <NavigationProgress color="gray" />
                <NavWatch />

                <Navbar />
            </header>
            <main className="">
                <Home />
                <Projects />
                <Experiences />
                <Contact />
            </main>
            <footer className="h-96"></footer>
        </>
    );
}
