import {Link} from 'react-router-dom';
import { useContext} from 'react';
import AppContext from '../Contexts/AppContext';
import Logout from '../Functions/Logout';

const logo = './img/logo.png';

function LoggedOutLinks(){
    return (
        <div className="group-row">
            <a href="/#/pricing">
            Hinnasto
            </a>

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

    const {token} = useContext(AppContext);

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
                            <LoggedInLinks/>
                        }
                    </nav>
                }
            </div>
      
        </header>
    );
}

export default Header;