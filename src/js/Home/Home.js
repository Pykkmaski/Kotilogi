import '../../scss/Home.scss';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <div id="home-page" className="page">

            <div className="grid-area">
                <h1 id="home-page-intro-text">Maan paras kodin remonttitietojen tallennuspaikka (ja paljon muuta!).</h1>
                <h2>Digikoti palveluun digitalisoit vaivattomasti kotisi remonttitiedot. Jätä hyvästit paperikasoille ja epävarmuudelle.</h2>
                <Link to="/register" id="create-acc-link">Luo Ilmainen Tili</Link>
                <h3>Emme kerää luottokortti- tai henkilökohtaisia tietoja.</h3>
            </div>

            <div className="grid-area">

            </div>
        </div>
    );
}

export default Home;