"use client";

import { useEffect, useRef } from 'react';
import style from './style.module.scss';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
    id: string,
    children: React.ReactNode,
}

export default function NavBar(props: Props){
    const firstRender = useRef(true);
    const pathname = usePathname();
 
    useEffect(() => {
        const links = document.querySelectorAll(`#${props.id} a`);
        if(firstRender.current === true){
            /**
             * Make the first nav element activated by default on the first render.
             * If there are searchParams, use those primarily. Otherwise use the end of the pathname.
             */

            const section = pathname.split('/').at(-1);
            const linksAsArray = Array.from(links);
            const element = linksAsArray.find(item => item.getAttribute('href') === section);

            //Default the selection to the first element in case no section matches.
            const index = element ? linksAsArray.indexOf(element) : 0;

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
        <nav className={style.navBarContainer} id={props.id}>
            {props.children}
        </nav>
    );
}