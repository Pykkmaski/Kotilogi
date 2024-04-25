import Button, { ButtonProps } from "./Button"

/**
 * Short-hand component for defining primary-buttons.
 * @param props 
 * @returns 
 */
export function PrimaryButton(props: ButtonProps){
    return (
        <Button
            variant='primary-dashboard'
            {...props}
        />
    );
}