import './Style.scss';
import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../Contexts/AppContext';
import UserToken from './UserToken/UserToken.js';
import { serviceName, userStorageName } from '../appconfig';

const padlockIcon = './img/padlock.png';
const userIcon = './img/user.png';
const infoIcon = './img/info.png';
const logoutIcon = './img/logout.png';

function Header(props){

    const {user, setUser} = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

    function logout(){
        setUser(null);
        localStorage.removeItem(userStorageName);
        location.assign('/#/');
        location.reload();
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
            <Link to="/">
                <div id="header-title-area">
                    <h1>{serviceName}.fi</h1>
                    <h2>Kotisi tiedot tallessa.</h2>
                </div>
            </Link>
            
            
            <div id="header-links-area">
                {
                    !user ?
                    <>
                        <Link to="/" className="button-link">
                            <img src={infoIcon}></img>
                            <span>APUA</span>
                        </Link>
                        <Link to="/login" className="button-link">
                            <img src={padlockIcon}/>
                            <span>KIRJAUDU</span>
                        </Link>
                        <Link to="/signup" className="button-link">
                            <img src={userIcon}/>
                            <span>LUO KÄYTTÄJÄTILI</span>
                        </Link>
                    </> 
                    :
                   <UserToken first={user.first_name} last={user.last_name + 'nonii-i'}/>
                    

                }
            </div>

            <div id="menu">
                <nav>
                    <ul>
                        <li>
                            <Link to="" onClick={logout} className="button-link">
                                <img src={logoutIcon}></img>
                                <span>KIRJAUDU ULOS</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;