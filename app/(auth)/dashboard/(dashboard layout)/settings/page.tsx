'use client';

import Form from "kotilogi-app/components/Form/Form";
import { useSession } from "next-auth/react";
import { EmailSettingsForm, Header, PasswordSettingsForm } from "./page.components";
import { useState } from "react";
import style from './page.module.scss';
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

export default function Page(){
    const session = useSession();
    if(!session.data || !session.data.user) return <h3>Ladataan tilin asetuksia...</h3>
    
    return (
        <main className={style.page}>
            <Header/>

            <EditCard title="Sähköpostiosoite">
                <EmailSettingsForm email={session.data.user.email}/>
            </EditCard>
            
            <EditCard title="Salasana">
                <PasswordSettingsForm email={session.data.user.email}/>
            </EditCard>

            <EditCard title="Tilaus">
                <SingleInputForm 
                    id="acc-plan-form"
                    inputElement={
                        <Select
                        name="plan"
                        label="Tilaustyyppi"
                        description="Tilauksesi tyyppi">
                            <option value="regular" selected={true}>Perus</option>
                            <option value="pro">Pro</option>
                        </Select>
                    } />
            </EditCard>
        </main>
    )
}