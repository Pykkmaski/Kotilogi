type HeadingProps = React.ComponentProps<'h3'>;

/**
 * A global component used for headings.
 * @param param0 
 * @returns 
 */
export function Heading({children, ...props}: HeadingProps){
    return (
        <h3 className="text-slate-500 text-xl">{children}</h3>
    );
}

export function SecondaryHeading({children}: React.ComponentProps<'span'>){
    return (
        <span className="text-slate-500 text-lg">{children}</span>
    )
}

export function BoxHeading({children}: React.PropsWithChildren){
    return (
        <span style={{fontSize: '1.2rem'}}>{children}</span>
    );
}