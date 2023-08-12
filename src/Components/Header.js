import {Link} from 'react-router-dom';
import { useContext, useState} from 'react';
import AppContext from '../Contexts/AppContext';
import Logout from '../Functions/Logout';
import Menu from './Menu/Menu';
const logo = './img/logo.png';

function LoggedOutLinks(){
    return (
        <div className="group-row">
            <Link to="/login" id="login-link">Kirjaudu</Link>
            <Link to="/register" id="register-link">Rekisteröidy</Link>
        </div>
    );
}

function LoggedInLinks(){
    const {setToken} = useContext(AppContext);
    
    return (
        <div className="group-row">
            <a href="" onClick={() => Logout(setToken)}>Kirjaudu Ulos</a>
        </div>
    );
}

function Header(props){

    const {token, user} = useContext(AppContext);
    const {menuOpen, setMenuOpen} = useContext(AppContext);

    return(
        <header className="d-flex flex-row align-items-center justify-content-between" id="primary-header">
            <div className="flex-row gap-m" id="header-logo-area">
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </div>
            
            <div className="navigation">
                {
                    <nav className="group-row">
                        {
                            !token ?
                            <LoggedOutLinks/>
                            :
                            <div className="group-row">
                                <span id="user-email">{user?.email}</span>
                                <LoggedInLinks/>
                            </div>

                        }
                    </nav>
                }
            </div>
        </header>
    );
}

export default Header;