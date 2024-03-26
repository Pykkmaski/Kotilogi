export function Profile(){
    const Image = () => (
        <img src="/img/about_page/portrait.jpg" className="aspect-auto md:w-[600px]"/>
    );

    const Text = () => (
        <div className="flex flex-col gap-4 h-full text-secondary md:w-[700px]">
            <h1 className="md:text-8xl xs:text-5xl text-secondary mb-10 md:text-left xs:text-center">Jani & Marika</h1>
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
        <section className="flex flex-row md:px-32 xs:px-4 md:py-32 xs:py-10 gap-4 bg-primary w-full">
            <div className="md:flex-row xs:flex-col flex gap-8 justify-center w-full">
                <Image/>
                <Text/>
            </div>
        </section>
    )
}