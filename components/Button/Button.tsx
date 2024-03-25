import Spinner from "../Spinner/Spinner";

export type ButtonProps = React.ComponentProps<'button'> & {
    loading?: boolean,
    variant?: 'primary' | 'primary-dashboard' | 'secondary' | 'secondary-filled',
};

export default function Button({children, variant = 'primary', ...props}: ButtonProps){
    
    const className = [
        props.className,
        props.hidden ? 'hidden' : '',
        'rounded-md p-2 flex flex-row gap-4',
        variant === 'primary' ? 'bg-primary hover:bg-[#ecf2a6] disabled:bg-slate-500' : 
        variant === 'secondary-filled' ? 'bg-secondary hover:bg-[#4c5018] disabled:bg-slate-500' : 
        variant === 'primary-dashboard' ? 'bg-orange-300 hover:bg-orange-200' : 'bg-transparent text-black'
    ];

    return (
        <button {...props} className={className.join(' ')}>
            {props.loading ? <Spinner size="1.2rem"/> : null}
            {children}
        </button>
    );
}