'use client';

import style from './page.module.scss';
import { Select } from "kotilogi-app/components/Input/Input";
import { SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { Margin } from "kotilogi-app/components/Util/Margin";
import { PasswordSettingsForm } from "./PasswordSettingsForm";
import { EmailSettingsForm } from "./EmailSettingsForm";
import { PaymentSettingsForm } from './PaymentSettingsForm';

export function Header(){
    return (
        <div className={style.header}>
            <h3 className="text-slate-500 text-2xl">Tilin asetukset</h3>
        </div>
    );
}

export function Content({user}){
    return (
        <>
            <ContentCard title="Turvallisuus">
                <div className="w-full">
                    <div className="mb-10">
                        <EmailSettingsForm email={user.email}/>
                    </div>
                    <PasswordSettingsForm/>
                </div>
                
            </ContentCard>
        </>
    )
}