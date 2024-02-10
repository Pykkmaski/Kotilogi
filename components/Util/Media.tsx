export function SmallDevices({children}){
    return (
        <div className="sm:block md:hidden">
            {children}
        </div>
    );
}

export function MediumDevices({children}){
    return (
        <div className="sm:hidden md:block">
            {children}
        </div>
    );
}

export function LargeDevices({children}){
    return (
        <div className="sm:hidden lg:block">
            {children}
        </div>
    )
}