'use client';
import style from './style.module.css';

type MobileMenuProps = React.PropsWithChildren & {
    open: boolean,
}

export function MobileMenu({children, open}: MobileMenuProps){

    const className = [
        "h-screen w-full bg-white flex flex-col gap-4 fixed top-0 left-0 z-50 justify-center items-center",
        open ? style.open : '',
        style.container,
    ];

    return (
        <div className={className.join(' ')}>
            {children}
        </div>
    );
} 