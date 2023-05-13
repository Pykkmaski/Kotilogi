import { useState } from 'react';
import {Link} from 'react-router-dom';

const profileImage = './img/profile1.jpg';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <>  
            <div id="home-page" className="page y-scroll">
                <div id="welcome-text-box">
                    <div id="welcome-text">
                        <h1 id="home-page-intro-text">"Talosi Huoltokirja"</h1>
                        <h2>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa</h2>
                        <Link to="/register" id="create-acc-link" className="home-register-button">Luo Ilmainen Tili</Link>
                    </div>

                    <img src="./img/people1.jpg" id="main-image" className="rounded"/>
                </div>

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

                <div className="page-element" id="home-page-footer">
                    <div id="main-links" className="flex-column gap-l">
                        <h2>Päälinkit</h2>
                        <Link to="">Etusivu</Link>
                        <Link to="">Tietoa</Link>
                        <Link to="">Hinnasto</Link>
                        <Link to="">Ota yhteyttä</Link>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Home;