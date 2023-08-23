function ProfileText(props){

    const profileImage = './img/profile1.jpg';

    return (
        <div  id="news-content" className="page-element gap-l font-sze-m">
            <div className="blur"/>
            <div className="news-box rounded d-flex flex-row">
                
                <div id="news-box-profile-text-section" className="d-flex flex-column">
                    <h1>Mistä idea?</h1>
                    <p>
                        Kotilogin idea tuli yhtäkkiä päivällä kun koitin etsiä salaojaremontin kuitteja edellisvuodelta kotitalousvähennystä varten.
                        Kuitteja remonteista on kertynyt osa kansioon ja osa sähköpostien sekaan, varmasti myös jokunen kadonnut.
                        Koitin hetken järjestellä koneelta löytyviä työpöydälle kansioon jonka nimesin osoitteen mukaan: Timontie 13.
                        Siinäpä se sitten välähti hetken kuluttua että kyllä nykypäivänä taloillakin pitäisi olla "sähköinen huoltokirja".
                        Sieltä ne taloon tehdyt remontit sun muut olisi helppo kaivaa esiin, seuraavallakin omistajalla kymmenen vuoden päästä.
                    </p>
                    <span id="story-signature">Jani Österberg</span>
                </div>

                <img width="300px"src={profileImage} id="profile-image"/>
            </div>
        </div>
    );
}

export default ProfileText;