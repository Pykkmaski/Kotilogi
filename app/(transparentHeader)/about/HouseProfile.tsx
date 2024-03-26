export function HouseProfile(){
    const Image = () => (
        <img src="/img/about_page/house.jpg" className="aspect-auto md:w-[800px] xs:w-full"/>
    );

    const Text = () => (
        <div className="flex flex-col gap-4 h-full text-secondary md:w-[700px]">
            <h1 className="md:text-8xl xs:text-5xl text-secondary mb-10 md:text-left xs:text-center">Timontie 13</h1>
            <p className="text-xl">
                Esimerkiksi juuri tällaisessa vanhemmassa vuonna 1959 valmistuneessa rintamiemtalossa on paljon historiaa mikä on hyvä pitää varmassa tallessa.<br/><br/>
                Tämä talokin on vielä 10 vuotta sitten ollut vaaleanpunainen ja tätä nykyään on väri vaihtunut hieman kuvan ottohetkestä puhtaan valkoiseksi ja vaaleanharmaaksi.
            </p>
        </div>
    )

    return (
        <section className="flex md:px-32 xs:px-4 md:py-32 xs:py-20 gap-4 bg-primary w-full">
            <div className="md:flex-row-reverse xs:flex-col flex gap-8 md:justify-center w-full">
                <Image/>
                <Text/>
            </div>
        </section>
    );
}