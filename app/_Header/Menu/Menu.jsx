"use client";

import {useState, useEffect} from 'react';
import useClassName from 'kotilogi-app/hooks/useClassName';

function MenuButton(props){
    const {className} = useClassName('menu-btn', props.open ? 'open' : null);

    return (
        <div className={className} onClick={() => props.setOpen(!props.open)}>
            <div className="btn-line"></div>
            <div className="btn-line"></div>
            <div className="btn-line"></div>
        </div>
    );
}

function MenuBody(props){
    const {className} = useClassName('menu-body', props.open ? 'open' : null);

    useEffect(() => {
        const links = document.querySelectorAll('.menu-nav a');
        if(!links) return;
        links.forEach(node => node.addEventListener('click', () => props.setOpen(false)));
    }, [props.render]);

    return (
        <div className={className} key='app-menu-body'>
            <nav className="menu-nav">
                {
                    props.userIsLoggedIn ? 
                    <>
                        <a href="/#/">Talot</a>
                        <a href="/#/logout">Kirjaudu Ulos</a>
                    </>
                    :
                    <>
                        <a href="/#/">Etusivu</a>
                        <a href="/#/login">Kirjaudu</a>
                        <a href="/#/register">Rekisteröidy</a>
                    </>
                }
            </nav>
        </div>
    )
}

export default function Menu(props){
    const [open, setOpen] = useState(false);

    return (
        <>
            <MenuButton open={open} setOpen={setOpen} style={{position: 'fixed'}}/>
            <MenuBody open={open} setOpen={setOpen} render={props.renderBody} userIsLoggedIn={props.userIsLoggedIn}/>
        </>
    );
}