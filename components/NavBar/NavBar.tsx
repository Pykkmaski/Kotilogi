"use client";

import { useEffect, useRef } from 'react';
import style from './style.module.scss';
import { usePathname } from 'next/navigation';

type Props = {
    children: React.ReactNode,
}

export default function NavBar(props: Props){
    const firstRender = useRef(true);
    const pathname = usePathname();
    
    useEffect(() => {
        const links = document.querySelectorAll(`.${style.navBarContainer}  a`);
        if(firstRender.current === true){
            //Make the first nav element activated by default on the first render.
            const section = pathname.split('/').at(-1);
            const linksAsArray = Array.from(links);
            const element = linksAsArray.find(item => item.getAttribute('href') === section);
            if(!element) throw new Error('Unable to render NavBar, default index cannot be set due to undefined element!');

            const index = linksAsArray.indexOf(element);

            links[index].classList.add(style.activated);
            firstRender.current = false;
        }

        const clickFunction = (e) => {
            links.forEach(link => {
                if(link.classList.contains(style.activated)){
                    link.classList.remove(style.activated);
                }
            });

            e.target.classList.add(style.activated);
        }

        links.forEach((link, index: number) => {
            link.addEventListener('click', clickFunction);
        });

        //Add cleanup function
        return () => links.forEach(link => link.removeEventListener('click', clickFunction))
    }, []);

    return (
        <nav className={style.navBarContainer}>
            {props.children}
        </nav>
    );
}