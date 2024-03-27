import Link from "next/link";
import Button from "../Button/Button"

export function CallToActionSection(){
    const Background = () => {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-room bg-center bg-cover opacity-70"/>
        );
    };

    return (
        <section className="flex flex-col py-32 bg-primary">
            <div className="flex-col flex gap-4 text-hero relative py-32">
                <Background/>

                <div className="flex flex-col z-10 items-center bg-[#0005] py-8">
                    <h1 className="md:text-8xl xs:text-4xl text-center md:mb-20 xs:mb-20 z-10">Perusta sinäkin kodillesi<br/> sähköinen huoltokirja</h1>

                    <Link href="/register">
                        <Button variant="primary">
                            <span className="mx-8 my-2 text-secondary">Rekisteröidy nyt</span>
                        </Button>
                    </Link>
                    
                    <p className="text-xl mt-10 w-full text-center text-hero">
                        30 päivän jälkeen talosi aktivointimaksu on kertamaksuna 9,90€<br/>
                        Kokeilujakson aikana saat tutustua palveluun ilman rajoituksia.
                    </p>
                </div>
            </div>
        </section>
    );
}