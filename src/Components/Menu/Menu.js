import { useContext } from 'react';
import useClassName from '../../Hooks/useClassName';
import AppContext from '../../Contexts/AppContext';

function Menu(props){

    const {className} = useClassName('menu', props.visible ? 'open' : null);
    const {user, token} = useContext(AppContext);

    return (
        <div className={className}>
            <nav>
                {
                    !token ?
                    props.loggedOutLinks
                    :
                    <div className="group-row">
                        <span id="user-email">{user?.email}</span>
                        {props.loggedInLinks}  
                    </div>
                }
            </nav>
        </div>
    );
}

export default Menu;