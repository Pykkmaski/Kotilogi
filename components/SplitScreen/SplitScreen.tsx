import React, { CSSProperties } from "react"
import style from './style.module.scss';

type SplitScreenProps = React.PropsWithChildren & {
    leftWeight?: number,
    rightWeight?: number,
    gap?: string,
}

export function SplitScreen({leftWeight = 1, rightWeight = 1, gap = '0px', ...props}: SplitScreenProps){
    const [left, right] = React.Children.toArray(props.children);

    const sharedSideStyle: CSSProperties = {
        padding: '0rem',
    }

    const leftStyle: CSSProperties = {
        ...sharedSideStyle,
        flex: leftWeight,
        borderRight: '1px solid #DDD',
    }

    const rightStyle: CSSProperties = {
        ...sharedSideStyle,
        flex: rightWeight,
    }

    return (
        <div className={style.container} style={{gap}}>
            <div style={leftStyle}>
                {left}
            </div>

            <div style={rightStyle}>
                {right}
            </div>
        </div>
    );
}