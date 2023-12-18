import Button, { ButtonProps } from "./Button"

/**
 * Short-hand component for defining primary-buttons.
 * @param props 
 * @returns 
 */
export default function PrimaryButton(props: ButtonProps){
    return (
        <Button
            className='primary'
            {...props}
        />
    );
}