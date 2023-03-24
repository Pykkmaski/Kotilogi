import './Style.scss';
import GridItem from './GridItem/GridItem';
import { useEffect, useRef, useState } from 'react';

function Home(props){

    const [content, setContent] = useState([]);

    return(
        <div id="home-page" className="page">
            <GridItem content={
                <>
                    <h1>Derveduloa Digigodiin. Ja biste wifiin :DDDD</h1>
                    <h2>
                        Däällä godin tiedot dallessa on, bimbom :DD
                    </h2>
                </>
                }
            />

            <GridItem content={

                <>
                    <h1>Mainogset ja Virolaised</h1>
                    <h2>Däällä lebää :DD</h2>
                </>
            } id="ad-area"/>

        </div>
    );
}

export default Home;