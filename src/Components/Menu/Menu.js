import { useContext } from 'react';
import useClassName from '../../Hooks/useClassName';
import AppContext from '../../Contexts/AppContext';

function Menu(props){

    const {className} = useClassName('menu', props.visible ? 'open' : null);
    const {user, token} = useContext(AppContext);

    return (
        <div className={className}>
            {
                token ? 
                <>
                </>
                :
                <nav>
                    <a href="/#/" onClick={() => props.setMenuOpen(false)}>Etusivu</a>
                    <a href="/#/login" onClick={() => props.setMenuOpen(false)}>Kirjaudu Sisään</a>
                    <a href="/#/register" onClick={() => props.setMenuOpen(false)}>Rekisteröidy</a>
                </nav>

            }
            
        </div>
    );
}

export default Menu;