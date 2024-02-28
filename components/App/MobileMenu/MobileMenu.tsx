'use client';

export function MobileMenu({children}){
    return (
        <div className="sm:flex md:hidden flex-col gap-2 p-2">
            {children}
        </div>
    )
}

export function Button(){
    return (
        <div className="sm:flex md:hidden flex-col gap-2 aspect-square w-64">
            <div className="w-full bg-white h-1"></div>
            <div className="w-full bg-white h-1"></div>
            <div className="w-full bg-white h-1"></div>
        </div>
    );
}