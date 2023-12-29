import React, { CSSProperties } from "react"

type SplitScreenProps = React.PropsWithChildren & {
    leftWeight?: number,
    rightWeight?: number,
}

export function SplitScreen({leftWeight = 1, rightWeight = 1, ...props}: SplitScreenProps){
    const [left, right] = React.Children.toArray(props.children);

    const splitScreenStyle: CSSProperties = {
        display: 'flex',
        width: '100%',
    }

    const leftStyle: CSSProperties = {
        flex: leftWeight,
    }

    const rightStyle: CSSProperties = {
        flex: rightWeight,
    }

    return (
        <div style={splitScreenStyle}>
            <div style={leftStyle}>
                {left}
            </div>

            <div style={rightStyle}>
                {right}
            </div>
        </div>
    );
}