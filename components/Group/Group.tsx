type GroupProps = React.PropsWithChildren & {
    direction: 'vertical' | 'horizontal',
    gap?: string,
}

/**A wrapper to arrange it's children in a row or a column. */
export function Group({children, direction = 'vertical', gap = '0.5rem'}: GroupProps){
    return (
        <div style={{
            display: 'flex',
            flexFlow: direction === 'vertical' ? 'column' : 'row',
            gap,
        }}>
            {children}
        </div>
    )
}