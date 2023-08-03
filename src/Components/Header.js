import {Link} from 'react-router-dom';
import { useContext, useState} from 'react';
import AppContext from '../Contexts/AppContext';
import Logout from '../Functions/Logout';
import Menu from './Menu/Menu';
import MenuButton from './Menu/MenuButton';

const logo = './img/logo.png';

function LoggedOutLinks(){
    return (
        <div className="group-row">
            <a href="/#/login">
                Kirjaudu
            </a>

            <a href="/#/register">
                Rekisteröidy
            </a> 
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
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <header className="d-flex flex-row align-items-center justify-content-between" id="primary-header">
            <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Menu token={token} visible={menuOpen} setMenuOpen={setMenuOpen} loggedInLinks={LoggedInLinks} LoggedOutLinks={LoggedOutLinks}/>

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