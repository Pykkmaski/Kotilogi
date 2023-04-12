import './Style.scss';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <>
            <div className="bg-filler"/>
            <div id="home-page" className="page">
                <div id="welcome-text-box" className="page-element">
                    <div id="welcome-text">
                        <h1 id="home-page-intro-text">"Talosi Huoltokirja"</h1>
                        <h2>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa</h2>
                        <Link to="/register" id="create-acc-link" className="primary-button">Aloita Ilmainen Kokeilu</Link>
                    </div>

                    <div id="animated-squares">
                        <div className="square">Näihin vois laittaa jotaki kiiltokuvia. Joo</div>
                        <div className="square">Joo</div>
                        <div className="square">Joojoo toi on hyvä idea</div>
                    </div>
                </div>

                <div className="page-element" id="news-content">
                    <h1>Tavaraatia</h1>
                </div>
            </div>
        </>
        
    );
}

export default Home;