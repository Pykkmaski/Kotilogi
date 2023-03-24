import './Style.scss';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../Contexts/AppContext';
import UserToken from './UserToken/UserToken.js';
import { userStorageName } from '../appconfig';

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
                    <h1>Digikoti.fi</h1>
                    <h2>Talosi historia tallessa.</h2>
                </div>
            </Link>
            
            
            <div id="header-links-area">
                {
                    !user ?
                    <>
                        <Link to="/login">Kirjaudu</Link>
                        <Link to="/signup">Luo Tili</Link>
                    </> :

                    <>
                        <UserToken first={user.first_name} last={user.last_name} onClick={() => linkToUserPage()}/>
                        <Link to="" onClick={logout}>Kirjaudu Ulos</Link>
                    </>

                }
                
            </div>
        </header>
    );
}

export default Header;