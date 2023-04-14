import './Style.scss';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <>
            <div id="home-page" className="page">
                <div id="welcome-text-box" className="page-element">
                    <div id="welcome-text">
                        <h1 id="home-page-intro-text">"Talosi Huoltokirja"</h1>
                        <h2>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa</h2>
                        <Link to="/register" id="create-acc-link" className="primary-button">Luo Ilmainen Tili</Link>
                    </div>

                    <img src="./img/people1.jpg" id="main-image"/>
                </div>

                <div className="page-element" id="news-content">
                    <div className="news-box">
                        <h1>Mistä idea?</h1>
                        <p>
                            Kotilogin idea tuli yhtäkkiä päivällä kun koitin etsiä salaojaremontin kuitteja edellisvuodelta kotitalousvähennystä varten.<br/>
                            Kuitteja remonteista on kertynyt osa kansioon ja osa sähköpostien sekaan, varmasti myös jokunen kadonnut.<br/>
                            Koitin hetken järjestellä koneelta löytyviä työpöydälle kansioon jonka nimesin osoitteen mukaan: Timontie 13.<br/>
                            Siinäpä se sitten välähti hetken kuluttua että kyllä nykypäivänä taloillakin pitäisi olla "sähköinen huoltokirja".<br/>
                            Sieltä ne taloon tehdyt remontit sun muut olisi helppo kaivaa esiin, seuraavallakin omistajalla kymmenen vuoden päästä.<br/>

                            
                        </p>

                        <span id="story-signature">Jani Österberg</span>
                    </div>
                </div>

                <div className="page-element" id="home-page-footer">
                    <div id="main-links">
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