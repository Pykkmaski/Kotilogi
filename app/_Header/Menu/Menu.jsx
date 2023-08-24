"use client";

import {useState, useEffect} from 'react';
import useClassName from 'kotilogi-app/hooks/useClassName';
import Link from 'next/link';

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

    const loggedInLinks = [
        {
            title: 'Talot',
            href: '/properties'
        },

        {
            title: 'Kirjaudu Ulos',
            href: '/logout'
        }
    ];

    const loggedOutLinks = [
        {
            title: 'Etusivu',
            href: '/'
        },

        {
            title: 'Kirjaudu',
            href: '/login'
        },

        {
            title: 'Rekisteröidy',
            href: '/register'
        }
    ];

    return (
        <div className={className} key='app-menu-body'>
            <nav className="menu-nav">
                {
                    props.userIsLoggedIn ? 
                    <>
                        {
                            loggedInLinks.map(link => {
                                return <Link href={link.href} >{link.title}</Link>
                            })
                        }
                    </>
                    :
                    <>
                        {
                            loggedOutLinks.map(link => {
                                return <Link href={link.href}>{link.title}</Link>
                            })
                        }
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