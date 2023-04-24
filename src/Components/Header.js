import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../Contexts/AppContext';
import { serviceName, userStorageName } from '../appconfig';
import 'bootstrap/scss/bootstrap.scss';
import Nav from 'react-bootstrap/Nav'
import NavBar from 'react-bootstrap/NavBar';
import LinkTo from '../Functions/LinkTo';

const logo = './img/logo.png';

function Header(props){

    const {token, setToken} = useContext(AppContext);

    return(
        <header className="d-flex flex-row align-items-center justify-content-between border-bottom" id="primary-header">
            <div className="flex-row gap-m" id="header-logo-area">
                <Link to="/">
                    <img src={logo}/>
                </Link>
            </div>
            
            <div className="d-flex flex-row justify-content-between">
                <NavBar>
                    {
                        !token ?
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
    
                            <Nav.Link href="" onClick={() => {setToken(null); LinkTo('/#/')}}>
                                Kirjaudu Ulos
                            </Nav.Link>
                        </Nav>
                    }
                </NavBar>
            </div>
      
        </header>
    );
}

export default Header;