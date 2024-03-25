export function Hero(){
    const Background = () => (
        <div className="bg-about-hero bg-cover bg-center opacity-90 absolute top-0 left-0 w-full h-full z-10"/>
    );

    return (
        <section className="flex flex-col md:py-40 xs:py-20 relative bg-primary">
            <Background/>
            <div className="bg-[#0004] w-full md:px-32 xs:px-4 z-20 py-10">
                <h1 className="md:text-8xl xs:text-4xl text-hero z-20">Idea omasta tarpeesta säilyttää omakotitalon tositteet tehdyistä korjauksista.</h1>
            </div>
        </section>
    );
}