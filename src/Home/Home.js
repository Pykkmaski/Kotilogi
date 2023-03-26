import './Style.scss';
import GridItem from './GridItem/GridItem';
import { useEffect, useRef, useState } from 'react';
import { serviceName } from '../appconfig';
import {Link} from 'react-router-dom';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <div id="home-page" className="page">
            <div className="text-area">
                <h1>Mikä {serviceName}?</h1>
                <p>
                    Oletko koskaan ollut tilanteessa jossa tarvitset tiedot asuntoosi tehdyistä remonteista, muttet satojen paperien ja kuittien seasta niitä löydä?<br/>
                    {serviceName} palvelu on tarkoitettu esimerkiksi näiden tietojen vaivattomaan sähköiseen säilyttämiseen. Tutustu lisää palveluihimme <Link to="/">Tästä</Link>

                </p>

                <h1>Kenelle?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id velit ut tortor pretium viverra suspendisse potenti nullam. Dictum sit amet justo donec enim diam. In egestas erat imperdiet sed euismod nisi porta lorem. Mi bibendum neque egestas congue quisque egestas diam. Velit laoreet id donec ultrices tincidunt arcu non sodales. Fringilla urna porttitor rhoncus dolor purus non. Blandit libero volutpat sed cras ornare arcu. Sit amet nulla facilisi morbi tempus iaculis. Aliquet bibendum enim facilisis gravida neque convallis a cras. Dis parturient montes nascetur ridiculus mus mauris vitae. Turpis egestas integer eget aliquet nibh.
                </p>
            </div>

            <div id="bg-picture"></div>
            

        </div>
    );
}

export default Home;