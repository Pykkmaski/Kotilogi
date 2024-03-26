'use client';

import Link from "next/link"
import style from './style.module.scss';
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**The background of the link displayed when on the route the link points to. */
function SelectedBackground(){
    const className = [
        style.selectedBackground,
        'shadow-lg',
    ];

    return (
        <div className={className.join(' ')}/>
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

    /**Use a font awesome icon. */
    icon?: string 
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
    const textClassName = [
        'z-10 decoration-none',
        isSelected ? 'text-black' : 'text-white',
    ];

    const imageClassName = [
        props.icon,
        isSelected ? 'filter-none' : 'invert',
    ]

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
            
            {
                props.icon ? (
                    <i 
                        className={`z-10 fa ${props.icon} text-center text-base ${isSelected ? 'text-black' : 'text-white'}`}
                    />
                )
                :
                <img
                    className={imageClassName.join(' ')}
                    src={props.imageSrc}
                    alt="Link Icon"
                    width={17}
                    height={17}
                />
            }
            
           <div className={textClassName.join(' ')}>{props.children}</div>
        </Link>
    );
}