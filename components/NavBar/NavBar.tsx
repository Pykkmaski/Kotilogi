'use client';
import { useSearchParams } from 'next/navigation';
import style from './style.module.scss';
import React from 'react';
import Link, { LinkProps } from 'next/link';

type Props = {
    /**
     * The direction in which the links inside the navbar will be distributed.
     */
    direction: 'vertical' | 'horizontal',

    /**
     * The name of the query inside the url which defines the selected-status of a link.
     */
    navSource: string,
    className?: string,
    links: JSX.Element[],
}

/**
 * A navbar component, where each link is highlighted based on the current path of the page.
 * @param props 
 * @returns 
 */
export const NavBar: React.FC<Props> = (props) => {
    
    const searchParams = useSearchParams();
    const currentNavSource = searchParams.get(props.navSource);

    props.links.forEach(link => {
        const linkHref = new URL(link.props.href);
        const navParam = linkHref.searchParams.get(props.navSource);
        if(navParam === currentNavSource){
            link.props.className = style.selected;
        }
    });

    if(props.direction === 'horizontal'){
        return (
            <nav className={style.containerHorizontal}>
                {props.links}
            </nav>
        );
    }
    else{
        return (
            <nav className={style.containerVertical}>
                {props.links}
            </nav>
        );
    }
}