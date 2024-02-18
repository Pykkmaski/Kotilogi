'use client';

import { CSSProperties } from "react";
import { VisibilityProvider } from "../../Util/VisibilityProvider/VisibilityProvider"
import React from "react";

type AccordionElementProps = React.PropsWithChildren & {

}

function AccordionElement({children, ...props}: AccordionElementProps){

    const style: CSSProperties = {
        paddingLeft: '1rem',
    }

    return (
        <div style={style}>{children}</div>
    );
}

type AccordionProps = React.PropsWithChildren & {
    buttonElement: React.ReactElement<React.ComponentProps<'button'>>,
}

export function Accordion({children, ...props}: AccordionProps){
    return (
        <VisibilityProvider>
            <VisibilityProvider.Trigger>
                {props.buttonElement}
            </VisibilityProvider.Trigger>

            <VisibilityProvider.Target>
                {
                    React.Children.map(children, (child: React.ReactElement) => {
                        return (
                            <AccordionElement>{child}</AccordionElement>
                        )
                    })
                }
            </VisibilityProvider.Target>
        </VisibilityProvider>
    );
}