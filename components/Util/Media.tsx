import React from "react";

export function SmallDevices({children}){
    return (
        <div className="xs:block md:hidden">
            {children}
        </div>
    );
}

export function MediumDevices({children}){
    return (
        <div className="xs:hidden md:block">
            {children}
        </div>
    );
}

export function LargeDevices({children}){
    return (
        <div className="xs:hidden lg:block">
            {children}
        </div>
    )
}