import React from "react";

export function FullWidth({children}){
    return (
        React.Children.toArray(children).map((child: React.ReactElement, index) => {
            return React.cloneElement(child, {
                ...child.props,
                style: {
                    width: '100%',
                }
            })
        })
    );
}