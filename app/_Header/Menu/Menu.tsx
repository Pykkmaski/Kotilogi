"use client";

import {useState, useEffect} from 'react';
import useClassName from 'kotilogi-app/hooks/useClassName';
import Link from 'next/link';
import styles from './component.module.scss';

function MenuButton(props){
    const {className} = useClassName(styles.button, props.open ? styles.btnOpen : null);

    useEffect(() => {
        const logo = document.querySelector('#main-header');
        if(!logo) return;

        if(props.open){
            logo!.classList.add('open');
        }
        else{
            logo!.classList.remove('open');
        }
    }, [props.open])
    return (
        <div className={className} onClick={() => props.setOpen(prev => !prev)}>
            <div className={styles.btnLine}></div>
            <div className={styles.btnLine}></div>
            <div className={styles.btnLine}></div>
        </div>
    );
}

function MenuBody(props){
    const {className} = useClassName(styles.body, props.open ? styles.bodyOpen : null);

    useEffect(() => {
        const links = document.querySelectorAll(`${styles.nav} a`);
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
        <div className={className}>
            <nav className={styles.nav}>
                {
                    props.userIsLoggedIn ? 
                    <>
                        {
                            loggedInLinks.map(link => {
                                return <Link href={link.href} key={`link-${link.title}`}>{link.title}</Link>
                            })
                        }
                    </>
                    :
                    <>
                        {
                            loggedOutLinks.map(link => {
                                return <Link href={link.href} key={`link-${link.title}`}>{link.title}</Link>
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