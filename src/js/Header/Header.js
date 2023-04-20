import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../Contexts/AppContext';
import UserToken from './UserToken/UserToken.js';
import { serviceName, userStorageName } from '../appconfig';
import Nav from '../../react-bootstrap/Nav'
import NavBar from '../../react-bootstrap/NavBar';

import './Style.scss';

const padlockIcon = './img/padlock.png';
const userIcon = './img/user.png';
const infoIcon = './img/info.png';
const logoutIcon = './img/logout.png';
const cogIcon = './img/settings.png';
const starIcon = './img/star.png';
const homeIcon = './img/house.png';
const euroIcon = './img/euro.png';
const logo = './img/logo.png';

function Header(props){

    const {user, setUser} = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);

    function logout(){
        setUser(null);
        localStorage.removeItem(userStorageName);
        location.assign('/#/');
    }

    function toggleMenu(){
        console.log('toggling menu...')
        const menu = document.querySelector('#menu');
        const menuBtn = document.querySelector('#menu-btn');
        
        if(menuOpen){
            menu.classList.remove('open');
            menuBtn.classList.remove('open');
        }
        else{
            menu.classList.add('open');
            menuBtn.classList.add('open');
        }

        setMenuOpen(!menuOpen);
    }

    return(
        <header className="d-flex flex-row align-items-center justify-content-between" id="primary-header">
            <div className="flex-row gap-m" id="header-logo-area">
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </div>
            
            <div className="d-flex flex-row justify-content-between">
                <NavBar>
                    {
                        !user ?
                        <Nav>
                            <Nav.Link href="/#/pricing">
                                Hinnasto
                            </Nav.Link>
    
                            <Nav.Link href="/#/login">
                                Kirjaudu
                            </Nav.Link>

                            <Nav.Link href="/#/register">
                                Rekisteröidy
                            </Nav.Link>
                        </Nav> 
                        :
                        <Nav>
    
                            <Nav.Link href={`/#/user`}>
                                Talot
                            </Nav.Link>
    
                            <Nav.Link href="" onClick={logout}>
                                Kirjaudu Ulos
                            </Nav.Link>
                        </Nav>
                    }
                </NavBar>
            </div>

                  
            <div className="flex-column center-all gap-sm" id="menu-btn" onClick={toggleMenu}>
                <div className="btn-line"/>
                <div className="btn-line"/>
                <div className="btn-line"/>
            </div>

            <div className="flex-column gap-m center-align padding-sm" id="menu"></div>
      
        </header>
    );
}

export default Header;