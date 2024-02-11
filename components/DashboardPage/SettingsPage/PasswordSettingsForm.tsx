'use client';

import { updatePassword } from "kotilogi-app/actions/user/updatePassword";
import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import {SecondaryButton} from "kotilogi-app/components/Button/SecondaryButton";
import { Group } from "kotilogi-app/components/Group";
import { Input } from "kotilogi-app/components/Input/Input";
import { useInputData, useStatus } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";
import {z} from 'zod';
import { useDashboardContext } from "../../../app/(auth)/dashboard/(dashboard layout)/DashboardContextProvider";
import { ErrorText } from "@/components/Util/Text";
import { usePasswordSettingsForm } from "./usePasswordSettingsForm";

const PasswordSchema = z.object({
    password1: z.string(),
    password2: z.string(),
    password3: z.string(),
});

export function PasswordSettingsForm(){
    const formRef = useRef<HTMLFormElement | null>(null);
    const {status, data, updateData, resetPasswordHandler, resetForm} = usePasswordSettingsForm(formRef);
    
    const router = useRouter();

    const hasAllPasswordsFilled = () => {
        return data.password1 && data.password2 && data.password3;
    }

    const hasSomeInput = () => data.password1 || data.password2 || data.password3;

    const submitDisabled = status === 'loading' || status === 'success';

    return (
            <form onSubmit={resetPasswordHandler} ref={formRef}>
                <div className="flex flex-col gap-4">
                    <Input type="password" placeholder="Kirjoita uusi salasana..." autoComplete="new-password" name="password1"
                        onChange={updateData}
                        label="Uusi Salasana"
                        description="Päivitä salasanasi."/>

                    <div className="flex flex-col gap-2">
                        <Input type="password" placeholder="Kirjoita uusi salasana uudelleen..." autoComplete="off" name="password2"
                            onChange={updateData}
                            label="Salasanan Vahvistus"
                            description="Vahvista uusi salasana."/>

                        {
                            status === 'password_mismatch' ? (
                                <div className="flex w-full text-sm justify-end">
                                    <ErrorText>Salasanat eivät täsmää!</ErrorText>
                                </div>
                            )
                            :
                            null
                        }
                    </div>
                    

                    <div className="flex flex-col gap-2">
                        <Input type="password" placeholder="Kirjoita nykyinen salasanasi..." autoComplete="off" name="password3"
                            onChange={updateData}
                            label="Nykyinen salasanasi"
                            description="Vahvista nykyinen salasanasi."/>
                        
                        {
                            status === 'invalid_password' ? (
                                <div className="w-full flex justify-end text-sm">
                                    <ErrorText>Salasana on väärä!</ErrorText>
                                </div>
                            )
                            :
                            null
                        }
                    </div>
                    

                    <div className="w-full">
                        <Group direction="row" justify="end" gap={4}>
                            <SecondaryButton hidden={!hasSomeInput() || status === 'loading'} onClick={resetForm} type="button">Tyhjennä</SecondaryButton>
                            <PrimaryButton type="submit" 
                                disabled={submitDisabled || !hasAllPasswordsFilled()}
                                loading={status === 'loading'}>Päivitä Salasana</PrimaryButton>
                        </Group>
                    </div>
                </div>
            </form>
    );
}
