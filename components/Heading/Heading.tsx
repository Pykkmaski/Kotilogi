type HeadingProps = React.ComponentProps<'h3'>;

/**
 * A global component used for headings.
 * @param param0 
 * @returns 
 */
export function Heading({children, ...props}: HeadingProps){
    return (
        <h3 {...props}>{children}</h3>
    );
}