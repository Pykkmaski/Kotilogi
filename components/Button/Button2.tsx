type ButtonProps = React.ComponentProps<'button'>;

export function PrimaryButton({children, ...props}: ButtonProps){
    return <button {...props} className="rounded-md p-2 text-black font-semibold bg-orange-300 shadow-md hover:bg-orange-200">{children}</button>
}