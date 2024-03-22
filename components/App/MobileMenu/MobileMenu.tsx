'use client';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider/VisibilityProvider';
import style from './style.module.css';
import { LineButton } from '@/components/MenuButton/LineButton';
import { useToggle } from 'kotilogi-app/hooks/useToggle';

type MobileMenuProps = React.PropsWithChildren & {
}

export function MobileMenu({children}: MobileMenuProps){
    const {toggled: open, toggleState} = useToggle(false);

    const className = [
        "h-screen w-full bg-white flex flex-col gap-4 fixed top-0 left-0 z-50 justify-center items-center",
        open ? style.open : '',
        style.container,
    ];

    return (
        <>
            <div className="absolute top-2 right-2">
                <LineButton open={open} toggleState={toggleState}/>
            </div>
            
            <div className={className.join(' ')}>
                {children}
            </div>
        </>
    );
} 