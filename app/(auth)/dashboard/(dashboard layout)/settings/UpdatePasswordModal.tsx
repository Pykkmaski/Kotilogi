import { useRef } from "react"
import { PasswordSettingsForm } from "./PasswordSettingsForm";

export function UpdatePasswordModal(){
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    
    return (
        <dialog ref={dialogRef}>
            <PasswordSettingsForm/>
        </dialog>
    )
}