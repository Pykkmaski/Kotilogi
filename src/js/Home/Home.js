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
                        <Link to="/register" id="create-acc-link" className="primary-button">Aloita Ilmainen Kokeilu</Link>
                    </div>

                    <div id="animated-squares">
                        <div className="square">Näihin vois laittaa jotaki kiiltokuvia. Joo</div>
                        <div className="square">Joo</div>
                        <div className="square">Joojoo toi on hyvä idea</div>
                    </div>
                </div>

                <div className="page-element" id="news-content">
                    <div className="news-box">
                        <h1>Uutisjäbä</h1>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sed libero enim sed faucibus. Rhoncus urna neque viverra justo nec ultrices dui. Sollicitudin aliquam ultrices sagittis orci. In nibh mauris cursus mattis molestie a iaculis at erat. Ultricies mi quis hendrerit dolor magna eget est. Sed nisi lacus sed viverra. Massa sed elementum tempus egestas sed. Vulputate odio ut enim blandit. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Proin nibh nisl condimentum id.
                        </p>
                    </div>
                </div>

                <div className="page-element" id="home-page-footer">
                    <div id="main-links">
                        <h2>Päälinkit</h2>
                        <Link to="">Etusivu</Link>
                        <Link to="">Tietoa</Link>
                        <Link to="">Hinnasto</Link>
                        <Link to="">Tarina</Link>
                        <Link to="">Ota yhteyttä</Link>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Home;