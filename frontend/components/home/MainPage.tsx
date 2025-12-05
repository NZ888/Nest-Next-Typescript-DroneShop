import Header from "@/components/layout/Header/Header";
import IntroSection from "@/components/home/IntroSection/IntroSection";
import {AboutSection} from "@/components/home/AboutSection/AboutSection";
import NewSection from "@/components/home/NewSection/NewSection";
import CatalogSection from "@/components/home/CatalogSection/CatalogSection";
import Footer from "@/components/layout/Footer/Footer";

export default async function MainPage() {
    return (
        <>
            <Header/>
            <IntroSection/>
            <AboutSection/>
            <NewSection/>
            <CatalogSection/>
            <Footer/>
        </>
    );
}
