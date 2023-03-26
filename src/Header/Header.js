import './Style.scss';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import UserToken from './UserToken/UserToken.js';
import { serviceName, userStorageName } from '../appconfig';

const padlockIcon = './img/padlock.png';
const userIcon = './img/user.png';
const infoIcon = './img/info.png';

function Header(props){

    const {user, setUser} = useContext(AppContext);

    function logout(){
        setUser(null);
        localStorage.removeItem(userStorageName);
        location.assign('/#/');
        location.reload();
    }

    function linkToUserPage(){
        location.assign('/#/user');
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
                    </> :

                    <>
                        <UserToken first={user.first_name} last={user.last_name} onClick={() => linkToUserPage()}/>
                        <Link to="" onClick={logout} className="button-link">Kirjaudu Ulos</Link>
                    </>

                }
                
            </div>
        </header>
    );
}

export default Header;