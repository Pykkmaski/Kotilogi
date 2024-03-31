'use client';

import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

type FooterNavProps = React.ComponentProps<'a'>;

function Link({children, ...props}){
    const linkRef = useRef<HTMLAnchorElement>(null);
    const pathname = usePathname();
    const currentPath = pathname.split('/').at(-1);

    useEffect(() => {
        if(linkRef.current){
            if(linkRef.current.href.split('/').at(-1) === currentPath){
                linkRef.current
            }
        }
    }, [pathname]);

    return (
        <a {...props} ref={linkRef}>{children}</a>
    );
}

export function FooterNav({children}: FooterNavProps){
    return (
        <nav className="z-20 overflow-x-scroll flex-row gap-10 items-center justify-center w-full fixed bottom-0 xs:flex md:hidden left-0 bg-black py-2 text-2xl text-white">
            {children}
        </nav>
    );
}

FooterNav.Link = Link;