type GroupProps = React.PropsWithChildren & {
    direction: 'col' | 'row',
    gap?: number,
    justify?: 'start' | 'end' | 'center' | 'between',
    center?: boolean,
}

/**A wrapper to arrange it's children in a row or a column. */
export function Group({children, justify = 'start', direction = 'col', gap = 0, center = false}: GroupProps){

    const className = [
        'flex',
        `flex-${direction}`,
        `gap-${gap}`,
        center,
        `justify-${justify}`
    ];

    return (
        <div className={className.join(' ')}>
            {children}
        </div>
    )
}