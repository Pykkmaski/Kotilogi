import {Link} from 'react-router-dom';

function WelcomeText(props){
    return (
        <div id="welcome-text-box">
            <div id="welcome-text">
                <h1 id="home-page-intro-text">"Talosi Huoltokirja"</h1>
                <h2>Korjaushistoria, kulutustiedot, kuvat matkan varrelta.<br/> Kaikki tallessa yhdessä paikassa.</h2>
                <Link to="/register" id="create-acc-link" className="home-register-button">Luo Ilmainen Tili</Link>
            </div>

            <img src="./img/index.jpg" id="main-image" className="rounded"/>
        </div>
    );
}

export default WelcomeText;