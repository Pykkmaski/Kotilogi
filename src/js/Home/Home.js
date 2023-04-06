import './Style.scss';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <div id="home-page" className="page">

            <div className="grid-area">
                <h1 id="home-page-intro-text">"Talosi Huoltokirja"</h1>
                <h2>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa</h2>
                <Link to="/register" id="create-acc-link">Aloita Ilmainen Kokeilu</Link>
            </div>

            <div className="grid-area">

            </div>
        </div>
    );
}

export default Home;