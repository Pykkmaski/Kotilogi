'use client';
import { useSearchParams } from 'next/navigation';
import style from './style.module.scss';
import React, { useEffect } from 'react';
import Link, { LinkProps } from 'next/link';

type Props = React.PropsWithChildren & React.ComponentProps<'nav'> & {
    /**
     * The direction in which the links inside the navbar will be distributed.
     */
    direction: 'vertical' | 'horizontal',

    /**
     * The name of the query inside the url which defines the selected-status of a link.
     */
    navSource: string,
    links: JSX.Element[],
}

/**
 * A navbar component, where each link is highlighted based on the current path of the page.
 * @param props 
 * @returns 
 */
export const NavBar: React.FC<Props> = (props: Props) => {
    
    const searchParams = useSearchParams();
    const currentNavSource = searchParams.get(props.navSource);

    useEffect(() => {
       props.links.forEach(link => {
            const linkHref = new URL(link.props.href);
            const oldClassName = link.props.className.split(' ');

            if(currentNavSource === linkHref.searchParams.get(props.navSource)){
                oldClassName.push(style.selected);
                link.props.className = oldClassName.join(' ');
            }
            else{
                const newClassName = oldClassName.split(' ')
            }
       })
    }, [searchParams])

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