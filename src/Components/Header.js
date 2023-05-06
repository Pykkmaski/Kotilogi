import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../Contexts/AppContext';
import { serviceName, userStorageName } from '../appconfig';
import 'bootstrap/scss/bootstrap.scss';
import Nav from 'react-bootstrap/Nav'
import NavBar from 'react-bootstrap/NavBar';
import LinkTo from '../Functions/LinkTo';
import Dropdown from './Dropdown.js';

const logo = './img/logo.png';

function Header(props){

    const {token, setToken} = useContext(AppContext);

    return(
        <header className="d-flex flex-row align-items-center justify-content-between" id="primary-header">
            <div className="flex-row gap-m" id="header-logo-area">
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </div>
            
            <div className="navigation">
                {
                    !token ? 
                    <nav>
                        <a href="/#/pricing">
                            Hinnasto
                        </a>

                        <a href="/#/login">
                            Kirjaudu
                        </a>

                        <a href="/#/register">
                            Rekisteröidy
                        </a> 
                    </nav>
                    :
                    <nav>
                        <a href={`/#/user`}>
                            Talot
                        </a>

                        <a href="" onClick={() => {location.assign('/#/'); setToken(null);}}>
                            Kirjaudu Ulos
                        </a>
                    </nav>
                }
            </div>
      
        </header>
    );
}

export default Header;