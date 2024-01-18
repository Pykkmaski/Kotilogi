'use client';

import Link from "next/link"
import style from './style.module.scss';
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**The background of the link displayed when on the route the link points to. */
function SelectedBackground(){
    return (
        <div className={style.selectedBackground}/>
    );
}

/**The indicator on the left border displayed when on the route the link points to. */
function SelectedIndicator(){
    return (
        <div className={style.selectedIndicator}/>
    );
}

export default function IconLink(props: React.ComponentProps<'a'> & {
    imageSrc: string,
    href: string,
}){
    const pathName = usePathname().split('/').at(-1);
    const ref = useRef<HTMLAnchorElement | null>(null);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if(!ref.current) return;

        const url = new URL(ref.current.href);
        if(url.pathname.split('/').at(-1) === pathName){
            setIsSelected(true);
        }
        else{
            setIsSelected(false);
        }
    }, [pathName]);

    const className = isSelected ? `${style.container} ${style.selected}` : style.container;


    return (
        <Link {...props} className={className.toString()} ref={ref}>
            {
                isSelected ? (
                    <>
                        <SelectedIndicator/>
                        <SelectedBackground/>
                    </>
                    
                 ) : null
            }
            
            <img
                src={props.imageSrc}
                alt="Link Icon"
                width={15}
                height={15}
            />
           {props.children}
        </Link>
    );
}