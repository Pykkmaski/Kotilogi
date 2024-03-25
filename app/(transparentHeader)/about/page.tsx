import { CallToAction } from "./CallToAction";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HouseProfile } from "./HouseProfile";
import { Profile } from "./Profile";

export default function AboutPage(){
    return (
        <>
            <main>
                <Hero/>
                <Profile/>
                <HouseProfile/>
                <CallToAction/>
            </main>

            <Footer/>
        </>
    );
}