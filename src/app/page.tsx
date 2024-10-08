import Contact from "@/components/contact";
import Experiences from "@/components/experiences";
import Footer from "@/components/footer";
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
                <NavWatch/>
                <Navbar />
            </header>
            <main className="">
                <Home />
                <Projects />
                <Experiences />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
