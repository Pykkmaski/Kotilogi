const Heading = ({children}) => <h1 className="text-2xl font-semibold mb-4">{children}</h1>
const SubHeading = ({children}) => <h2 className="text-xl font-semibold mb-4">{children}</h2>
const CustomLink = (props: React.ComponentProps<'a'>) => {
    return <a {...props} className="text-orange-500">{props.href}</a>
}

export default async function PaymentTermsPage(){
    return (
        <main className="text-slate-500 px-32 pt-8 h-full pb-10">
            <Heading>Toimitusehdot</Heading>

            <p>
                Kotidok Oy 123456-7 (jäljempänä verkkokauppa) myy tuotteita yksityishenkilöille Suomeen.<br/> 
                Pidätämme oikeuden toimitusehtojen ja hintojen muutoksiin. Tuotteiden hinnat sisältävät arvonlisäveron.<br/><br/>
            </p>
           
            <SubHeading>Verkkokaupan yhteystiedot</SubHeading>
            
            <p>
                Sähköposti: kotidok.service@gmail.com<br/>
                Puhelin: ???<br/>
                Postiosoite: Tomintie 13, 65300 Vaasa<br/><br/>
            </p>
            
            <SubHeading>Tilaaminen</SubHeading>

            <p>
                Tilattavat tuotteet valitaan verkkosivuilla lisäämällä ne ostoskoriin. Tilaus lähetetään maksamalla ostoskorin sisältö verkkokaupan kassatoiminnossa.<br/> 
                Tehdessäsi tilauksen hyväksyt nämä toimitusehdot, tuotteiden hinnat sekä toimituskulut. Mikäli tilaushetkellä annetaan sähköpostiosoite, tilauksesta lähetetään tilausvahvistus sähköpostitse.<br/>
                Tilausvahvistuksesta ilmenevät tilatut tuotteet sekä hinta.<br/><br/>
            </p>
            
            <SubHeading>Maksaminen</SubHeading>

            <p>
                Verkkokaupan maksuvälittäjänä toimii Visma Pay (Visma Payments Oy, y-tunnus 2486559-4), joka on rekisteröity Finanssivalvonnan ylläpitämään maksulaitosrekisteriin.<br/>
                Maksamiseen siirrytään Visma Payn verkkopalvelun kautta ja tiliotteella ja laskulla maksun saajana näkyy Visma Pay tai Visma Payments Oy.<br/>
                Visma Pay välittää maksut verkkokauppiaalle. Maksaminen on turvallista, sillä kaikki maksutapahtumaa koskevat tiedot välitetään salattua yhteyttä käyttäen niin ettei kukaan ulkopuolinen taho näe maksutapahtuman tietoja.<br/><br/>

                Kauppa syntyy verkkokaupan asiakkaan ja verkkokaupan välille. Verkkokaupan vastuulla ovat kaikki kauppaan liittyvät velvoitteet.<br/><br/>

                Lue lisää Visma Paysta: <CustomLink href="https://www.vismapay.fi/"/><br/><br/>
            </p>
        
            <SubHeading>Maksutavat</SubHeading>

            <p>
                Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla, lompakolla, maksukorteilla (credit/debit), laskulla tai osamaksulla. 
                Käytettävissä ovat seuraavat maksutavat: Osuuspankki, Nordea, Danske Bank, Oma Säästöpankki, Säästöpankki, Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken, Ålandsbanken, MobilePay, Pivo, Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit MasterCard -kortit, sekä Alisa Lasku ja Alisa Yrityslasku.<br/><br/>

                MobilePay: Voit maksaa MobilePay-lompakollasi mikäli olet sallinut verkkokaupoissa maksamisen sovelluksen asetuksista. <br/>
                MobilePay-lompakolla suoritetut maksut veloitetaan lompakkoon liitetyltä maksukortilta. Mikäli maksun veloittaminen maksukortilta epäonnistuu, MobilePay-lompakolla maksaminen ei ole mahdollista verkkokaupassa.<br/><br/>

                Pivo: Käyttöehdot ovat tarjolla Pivon sivuilla: <CustomLink href="https://pivo.fi/kayttoehdot/pivon-kayttoehdot/"/><br/><br/>

                OP Lasku - Joustava tapa maksaa verkko-ostokset. Kaikkien pankkien asiakkaille. OP Laskulla voit tehdä enintään 5 000 euron suuruisia ostoksia ja maksaa ne korottomasti pois 45 vuorokauden sisällä.<br/>
                Halutessasi voit pilkkoa laskun useampaan maksuerään. Ostoksesi näkyvät yhdessä paikassa, joten pysyt helposti perillä rahan käytöstä. Luottorajan avulla pidät kulutuksen haluamissasi rajoissa.<br/>
                Saat laskut kätevästi sähköpostiisi. Verkkopalvelussamme näet tietoja OP Laskun käytöstäsi ja tekemiesi ostosten summan.<br/>
                Voit käyttää OP Laskua, jos olet maksukykyinen yli 20-vuotias, ja sinulla on suomalaisen pankin verkkotunnukset.<br/>
                Lisätietoja OP Laskuun liittyen löydät osoitteesta: <CustomLink href="https://www.op.fi/henkiloasiakkaat/paivittaiset/maksaminen/op-lasku"/><br/><br/>

                Alisa Lasku on joustava ja turvallinen maksutapa. Maksutapa sopii kaikille yli 20-vuotiaille kuluttajille kaiken tyyppisiin ostoksiin.<br/>
                Halutessasi voit jakaa laskun pienempiin osiin ja maksaa takaisin jopa 60 erässä.<br/>
                Lisätietoja Alisa Laskuun liittyen löydät osoitteesta: <CustomLink href="https://www.alisapankki.fi/"/><br/><br/>

                Alisa Yrityslasku on joustava ja turvallinen maksutapa yrityksille. Maksutapa sopii kaikille suomalaisille yrityksille yhtiömuodosta riippumatta.<br/>
                Ostajan osto-oikeus varmennetaan kokonaan digitaalisesti ja ostotapahtuma vie vain muutaman minuutin. Yritys voi itse valita sopivan maksuajan kolmesta eri vaihtoehdosta: 14 päivää, 30 päivää tai 60 päivää.<br/>
                Lisätietoja Alisa Yrityslaskuun liittyen löydät osoitteesta: <CustomLink href="https://www.alisapankki.fi/"/><br/><br/>
            </p>

            <SubHeading>Visma Pay -maksupalvelun yhteystiedot</SubHeading>

            <p>
                Visma Payments Oy (Y-tunnus 2486559-4)<br/>
                Sähköposti: <a href="mailto:helpdesk@vismapay.com" className="text-orange-500">helpdesk@vismapay.com</a><br/>
                Puhelin: 09 315 42 037 (arkisin klo 9-16)<br/>
                Postiosoite: Brahenkatu 4, 53100 Lappeenranta
            </p>
        </main>
    );
}