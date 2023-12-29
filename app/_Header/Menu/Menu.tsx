"use client";

import {useState, useEffect} from 'react';
import useClassName from 'kotilogi-app/hooks/useClassName';
import Link from 'next/link';
import styles from './component.module.scss';
import { signOut } from 'next-auth/react';

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
        const links = document.querySelectorAll(`nav a`);
        if(!links) return;
        links.forEach(node => node.addEventListener('click', () => props.setOpen(false)));
    }, [props.userIsLoggedIn]);

    const loggedInLinks = [
        <Link href="/" key={'index-link'}>Etusivu</Link>,
        <Link href="/auth/properties" key={'houses-link'}>Tili</Link>,
        <Link href="/tos" key={'tos-link'}>Käyttöehdot</Link>,
        <Link href="#" onClick={() => signOut()} key={'signout-link'}>Kirjaudu Ulos</Link>
    ];

    const loggedOutLinks = [
        {
            title: 'Etusivu',
            href: '/',
            className: styles.indexLink,
        },

        {
            title: 'Hinnasto',
            href: "/pricing",
        },

        {
            title: 'Kirjaudu',
            href: '/login'
        },

        {
            title: 'Rekisteröidy',
            href: '/register'
        },

        {
            title: 'Käyttöehdot',
            href: '/tos',
        }
    ];

    return (
        <dialog className={className} open={props.open}>
            <nav className={styles.nav}>
                {
                    props.userIsLoggedIn ? 
                    <>
                        {loggedInLinks}
                    </>
                    :
                    <>
                        {
                            loggedOutLinks.map((link, index: number) => {
                                return <Link href={link.href} key={`link-${link.title}-${index}`} className={link.className}>{link.title}</Link>
                            })
                        }
                    </>
                }
            </nav>
        </dialog>
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