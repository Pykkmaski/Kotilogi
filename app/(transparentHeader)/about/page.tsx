import Button from "@/components/Button/Button";
import Link from "next/link";

function Hero(){
    const Background = () => (
        <div className="bg-about-hero bg-cover bg-center opacity-90 absolute top-0 left-0 w-full h-full z-10"/>
    );

    return (
        <section className="flex flex-col py-40 relative bg-primary">
            <Background/>
            <div className="bg-[#0004] w-full px-32 z-20 py-10">
                <h1 className="text-8xl text-hero z-20">Idea omasta tarpeesta säilyttää omakotitalon tositteet tehdyistä korjauksista.</h1>
            </div>
        </section>
    );
}

function Profile(){
    const Image = () => (
        <img src="/img/about/portrait.jpg" className="aspect-auto md:w-[600px]"/>
    );

    const Text = () => (
        <div className="flex flex-col gap-4 h-full text-secondary md:w-[700px]">
            <h1 className="text-8xl text-secondary mb-10">Jani & Marika</h1>
            <p className="text-xl">
                Jani Österberg ja Marika Leppiaho ostivat vanhan rintamamiestalon Vaasassa 2021.<br/>
                Omaa kotia etsiessä kiinnittyi huomio jo siihen kuinka monissa varteen otettavissa vaihtoehdoissa oli kuitenkin historia vähän hämärän peitossa.<br/>
                Tehtyjä korjauksia oli selkeästi tehty mutta tositteita ei ollut enää tallella.<br/><br/>
                Ostamassaan kohteessa oli se hyvä puoli että suurin osa kuitenkin löytyi isossa mapissa säilytettynä. Tämä tarkkuus korjaustositteista johtuu varmasti Janin ammatista. Useamman vuoden automyyjänä työskentelystä on opettanut olemaan tarkka huoltokuiteista. Taloa tuli remontoitua heti oston jälkeen aika nopeasti oman maun mukaisesti.<br/><br/>
                Myös isompia remontteja tuli tehtyä, salaojat ja lämmitysmuodon vaihdos öljystä kaukolämpöön. Laskut tuli pyydettyä aina sähköpostilla että ne sai säilytettyä tietokoneella, tässä kohtaa vielä gmailin pilvessä. Ely-keskukselta sai vielä tähän aikaan hyvän tuen lämmitysmuodon vaihtoon, toki se oli aika pitkä prosessi ja tositteita vaadittiin kaikennäköisestä. Siinä kohtaan kun lisäselvityksiä taas monennenkohan kerran vaadittiin niin välähti idea että kyllä taloillakin täytyisi olla sähköinen huoltokirja, missä nämä kaikki tositteet säilyisi varmasti myös seuraavalle omistajalle vuosien päästä.
            </p>
        </div>
    )

    return (
        <section className="flex flex-row px-32 py-32 gap-4 bg-primary w-full">
            <div className="flex-row flex gap-8 justify-center w-full">
                <Image/>
                <Text/>
            </div>
        </section>
    )
}

function HouseProfile(){
    const Image = () => (
        <img src="/img/about/house.jpg" className="aspect-auto md:w-[800px]"/>
    );

    const Text = () => (
        <div className="flex flex-col gap-4 h-full text-secondary md:w-[700px]">
            <h1 className="text-8xl text-secondary mb-10">Timontie 13</h1>
            <p className="text-xl">
                Esimerkiksi juuri tällaisessa vanhemmassa vuonna 1959 valmistuneessa rintamiemtalossa on paljon historiaa mikä on hyvä pitää varmassa tallessa.<br/><br/>
                Tämä talokin on vielä 10 vuotta sitten ollut vaaleanpunainen ja tätä nykyään on väri vaihtunut hieman kuvan ottohetkestä puhtaan valkoiseksi ja vaaleanharmaaksi.
            </p>
        </div>
    )

    return (
        <section className="flex px-32 py-32 gap-4 bg-primary w-full">
            <div className="flex-row-reverse flex gap-8 justify-center w-full">
                <Image/>
                <Text/>
            </div>
        </section>
    );
}

function CallToAction(){
    return (
        <section className="flex flex-col justify-center items-center px-32 py-32 bg-[#b8bc7f] text-white">
            <h1 className="text-7xl mb-10">Aloita sinäkin nyt.</h1>
            <Link href="/register">
                <Button variant="primary">
                    <span className="mx-8 text-secondary">Rekisteröidy</span>
                </Button>
            </Link>

            <p className="text-lg mt-10">
                Saat 30 päivän ajan tutustua palveluun ilmaiseksi.<br/>
                Talon aktivointi palveluun kertamaksuna 9,90€
            </p>
        </section>
    )
}

function Footer(){
    return (
        <footer className="flex flex-col gap-4 justify-between bg-primary px-32 pt-10 pb-32">
            <h2 className="text-4xl font-semibold text-black">Kotidok Oy</h2>
            <div className="flex flex-col gap-4">
                <Link href="/">Etusivulle</Link>
            </div>
        </footer>
    );
}

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