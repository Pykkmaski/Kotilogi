import Button, { ButtonProps } from "./Button"

/**
 * Short-hand component for defining secondary-buttons.
 * @param props 
 * @returns 
 */
export default function SecondaryButton(props: ButtonProps){
    return (
        <Button
            className='secondary'
            {...props}
        />
    );
}