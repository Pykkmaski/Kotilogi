type GroupProps = React.PropsWithChildren & {
    direction: 'vertical' | 'horizontal',
    gap?: string,
    justifyContent?: string,
}

/**A wrapper to arrange it's children in a row or a column. */
export function Group({children, justifyContent, direction = 'vertical', gap = '0.5rem'}: GroupProps){
    return (
        <div style={{
            display: 'flex',
            flexFlow: direction === 'vertical' ? 'column' : 'row',
            justifyContent,
            gap,
        }}>
            {children}
        </div>
    )
}