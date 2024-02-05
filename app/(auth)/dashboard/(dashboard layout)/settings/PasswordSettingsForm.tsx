'use client';

import { updatePassword } from "kotilogi-app/actions/user/updatePassword";
import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import { Group } from "kotilogi-app/components/Group";
import { Input } from "kotilogi-app/components/Input/Input";
import { useInputData, useStatus } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";
import {z} from 'zod';
import { useDashboardContext } from "../DashboardContextProvider";

const PasswordSchema = z.object({
    password1: z.string(),
    password2: z.string(),
    password3: z.string(),
});

export function PasswordSettingsForm(){
    const {user} = useDashboardContext();
    const email = user.email;

    const {data, updateData, reset: resetData} = useInputData({email});
    const [status, setStatus] = useStatus('idle');
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        if(data.password1 !== data.password2){
            toast.error('Salasanat eivät täsmää!');
            setStatus('error');
        }
        else{
            updatePassword(email, data.password1, data.password3)
            .then(() => {
                toast.success('Salasana päivitetty!');
                setStatus('success');
                reset();
                router.refresh();
            })
            .catch(err => {
                toast.error(err.message);
                setStatus('error');
            });
        }
    }

    const hasAllPasswordsFilled = () => {
        return data.password1 && data.password2 && data.password3;
    }

    const hasSomeInput = () => data.password1 || data.password2 || data.password3;

    const reset = () => {
        resetData();
        formRef.current?.reset();
    }

    const submitDisabled = status === 'loading' || status === 'success';

    return (
            <form onSubmit={onSubmit} ref={formRef}>
                <Group direction="col" gap={4}>
                    <Input type="password" placeholder="Kirjoita uusi salasana..." autoComplete="new-password" name="password1"
                        onChange={updateData}
                        label="Uusi Salasana"
                        description="Päivitä salasanasi."/>

                    <Input type="password" placeholder="Kirjoita uusi salasana uudelleen..." autoComplete="off" name="password2"
                        onChange={updateData}
                        label="Salasanan Vahvistus"
                        description="Vahvista uusi salasana."/>

                    <Input type="password" placeholder="Kirjoita nykyinen salasanasi..." autoComplete="off" name="password3"
                        onChange={updateData}
                        label="Nykyinen salasanasi"
                        description="Vahvista nykyinen salasanasi."/>

                    <div className="w-full">
                        <Group direction="row" justify="end" gap={4}>
                            <SecondaryButton hidden={!hasSomeInput() || status === 'loading'} onClick={reset} type="button">Tyhjennä</SecondaryButton>
                            <PrimaryButton type="submit" 
                                disabled={submitDisabled || !hasAllPasswordsFilled()}
                                loading={status === 'loading'}>Päivitä Salasana</PrimaryButton>
                        </Group>
                    </div>
                </Group>
            </form>
    );
}
