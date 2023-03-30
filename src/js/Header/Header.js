import '../../scss/Header.scss';
import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../Contexts/AppContext';
import UserToken from './UserToken/UserToken.js';
import { serviceName, userStorageName } from '../appconfig';

const padlockIcon = './img/padlock.png';
const userIcon = './img/user.png';
const infoIcon = './img/info.png';
const logoutIcon = './img/logout.png';
const cogIcon = './img/settings.png';
const starIcon = './img/star.png';
const homeIcon = './img/house.png';
const euroIcon = './img/euro.png';

function Header(props){

    const {user, setUser} = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

    function logout(){
        toggleMenu();
        setUser(null);
        localStorage.removeItem(userStorageName);
        location.assign('/#/');
    }

    function toggleMenu(){
        console.log('toggling menu...')
        const menu = document.querySelector('#menu');
        if(menuOpen){
            menu.classList.remove('open');
        }
        else{
            menu.classList.add('open');
        }

        setMenuOpen(!menuOpen);
    }

    return(
        <header>
            <div id="header-logo-area">
                <img src={homeIcon}></img>
                <Link to="/">
                    <div id="header-title-area">
                        <h1>{serviceName}.fi</h1>
                        <h2>Kotisi tiedot tallessa.</h2>
                    </div>
                </Link>
            </div>

            <div id="header-primary-links-area">
                
            </div>
            
            <div id="header-links-area">
                {
                    !user ?
                    <>
                        <Link to="/" className="button-link">
                            <img src={infoIcon}></img>
                            <span>APUA</span>
                        </Link>

                        <Link to="" className="button-link">
                            <img src={euroIcon}></img>
                            <span>HINNASTO</span>
                        </Link>

                        <Link to="/login" className="button-link">
                            <img src={padlockIcon}/>
                            <span>KIRJAUDU</span>
                        </Link>
                        <Link to="/register" className="button-link">
                            <img src={userIcon}/>
                            <span>LUO KÄYTTÄJÄTILI</span>
                        </Link>
                    </> 
                    :
                    <>

                        <Link to={`/user`} className="button-link">
                            <img src={homeIcon}></img>
                            <span>TALOT</span>
                        </Link>

                        <Link to="" onClick={logout} className="button-link">
                            <img src={logoutIcon}></img>
                            <span>KIRJAUDU ULOS</span>
                        </Link>

                        <UserToken first={user.first_name} last={user.last_name} onClick={toggleMenu}/>
                    </>
                  
                }
            </div>

            <div id="menu">
                
            </div>
        </header>
    );
}

export default Header;