'use client';

import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { PasswordSettingsForm } from "../../../../../components/DashboardPage/SettingsPage/PasswordSettingsForm";
import { EmailSettingsForm } from "./EmailSettingsForm";

export function Header(){
    return (
        <div className="flex justify-between items-center">
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