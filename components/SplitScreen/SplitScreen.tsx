import React, { CSSProperties } from "react"
import style from './style.module.scss';

type SplitScreenProps = React.PropsWithChildren & {
    leftWeight?: number,
    rightWeight?: number,
}

export function SplitScreen({leftWeight = 1, rightWeight = 1, ...props}: SplitScreenProps){
    const [left, right] = React.Children.toArray(props.children);

    const leftStyle: CSSProperties = {
        flex: leftWeight,
        borderRight: '1px solid #DDD',
    }

    const rightStyle: CSSProperties = {
        flex: rightWeight,
    }

    return (
        <div className={style.container}>
            <div style={leftStyle}>
                {left}
            </div>

            <div style={rightStyle}>
                {right}
            </div>
        </div>
    );
}