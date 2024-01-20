import React, { CSSProperties } from "react";

type GroupProps = React.PropsWithChildren & {
    weights: number[],
    direction?: 'vertical' | 'horizontal',
    gap?: string,
    justifyContent?: string,
    alignItems?: string,
}

export function Group({children, weights, direction = 'vertical', ...props}: GroupProps){
    if(weights.length !== React.Children.count(children)){
        throw new Error('Group: The length of the passed weights must be equal to the number of children!');
    }

    const style: CSSProperties = {
        display: 'flex',
        flexFlow: direction === 'vertical' ? 'column' : 'row',
        gap: props.gap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
    }

    return (
        <div style={style}>
            {
                React.Children.toArray(children).map((child, index) => {
                    return (
                        <div style={{flex: weights[index]}} key={`${child}-${index}`}>
                            {child}
                        </div>
                    )
                })
            }
        </div>
    );
}