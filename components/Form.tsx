export function Form({children, ...props}: React.ComponentProps<'form'>){
    return (
        <form className="py-4 px-16" {...props}>{children}</form>
    );
}