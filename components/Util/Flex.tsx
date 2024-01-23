type FlexProps = React.PropsWithChildren & {
    value: number,
}

/**A component wrapping its children in a container defining the flex property with the provided value. */
export function Flex({children, value}: FlexProps){
    return (
        <div style={{flex: value}}>{children}</div>
    )
}