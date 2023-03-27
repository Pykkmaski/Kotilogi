import '../Home.scss';
import GridItem from './GridItem/GridItem';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <div id="home-page" className="page">

            <div className="grid-area">
                <h1 id="home-page-intro-text">Maan paras kotien remonttitietojen tallennuspaikka (ja paljon muuta!)</h1>
            </div>

            <div className="grid-area">

            </div>
        </div>
    );
}

export default Home;