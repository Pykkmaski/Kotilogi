import updateUser from "kotilogi-app/actions/updateUser";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { useState } from "react";
import style from './page.module.scss';
import { Input } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export function Header(){
    return (
        <div className={style.header}>
            <h3>Asetukset</h3>
        </div>
    );
}


export function EmailSettingsForm({email}){
    
    const onSubmit = (newData) => {
        return updateUser(email, newData);
    }

    return (
        <SingleInputForm 
            onSubmit={onSubmit}
            inputElement={
                <Input
                    name="email"
                    label="Sähköpostiosoite"
                    description="Päivitä sähköpostiosoitteesi."
                    defaultValue={email}/>
            }/>
    );
}

export function PasswordSettingsForm({email}){
    return (
        <SingleInputForm 
        
            inputElement={
                <Input
                name="password"
                label="Salasana"
                description="Päivitä Salasanasi."/>
            }/>
    );
}