import updateUser from "kotilogi-app/actions/updateUser";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { useState } from "react";
import style from './page.module.scss';
import { Input } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";

export function Header(){
    return (
        <div className={style.header}>
            <h3>Asetukset</h3>
        </div>
    );
}


export function EmailSettingsForm({email, updateUser}){

    return (
        <SingleInputForm 
            submitMethod={updateUser}
            inputComponent={Input}
            initialInputProps={{
                name: 'email',
                label: 'Sähköpostiosoite',
                description: 'Päivitä sähköpostiosoitteesi.',
                defaultValue: email,
                type: 'email',
            }}/>
    );
}

export function PasswordSettingsForm({email, updateUser}){
    return (
        <SingleInputForm 
            submitMethod={updateUser}
            inputComponent={Input}
            initialInputProps={{
                name: 'password',
                label: 'Salasana',
                description: 'Päivitä salasanasi.',
                type: 'password',
                defaultValue: 'Uusi salasana',
                placeholder: 'Kirjoita uusi salasana...',
            }}/>
    );
}

export function Content({user}){

    const onSubmit = (data: object) => {
        return updateUser(user.email, data);
    }

    return (
        <>
            <EditCard title="Yleiset">
                <EmailSettingsForm email={user.email} updateUser={onSubmit}/>
                <PasswordSettingsForm email={user.email} updateUser={onSubmit}/>
            </EditCard>
        </>
    )
}