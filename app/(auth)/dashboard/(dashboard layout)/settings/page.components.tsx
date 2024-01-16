import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import style from './page.module.scss';
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { SingleInputForm, SingleSelectForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { Group } from "kotilogi-app/components/Group/Group";
import { useInputData, useStatus } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { updateEmail, updatePassword } from "kotilogi-app/actions/user/updateUser";
import toast from "react-hot-toast";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export function Header(){
    return (
        <div className={style.header}>
            <h3>Asetukset</h3>
        </div>
    );
}


export function EmailSettingsForm({email}){

    const submitMethod = async (newData: {email: string}) => {
        return updateEmail(email, newData.email);
    }

    return (
        <SingleInputForm 
            submitMethod={submitMethod}
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

export function PasswordSettingsForm({email}){

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
            <Input type="password" placeholder="Kirjoita uusi salasana..." autoComplete="new-password" name="password1"
                onChange={updateData}
                label="Uusi Salasana"
                description="Päivitä salasanasi."/>

            <Input type="password" placeholder="Kirjoita uusi salasana uudelleen..." autoComplete="off" name="password2"
                onChange={updateData}
                label="Vahvista uusi salasana"/>

            <Input type="password" placeholder="Kirjoita nykyinen salasanasi..." autoComplete="off" name="password3"
                onChange={updateData}
                label="Nykyinen salasanasi"
                description="Vahvista nykyinen salasanasi."/>

            <Group direction="horizontal" justifyContent="right" gap="1rem">
                <SecondaryButton desktopText="Tyhjennä" hidden={!hasSomeInput()} onClick={reset}/>
                <PrimaryButton desktopText="Päivitä" type="submit" 
                    disabled={submitDisabled || !hasAllPasswordsFilled()}
                    loading={status === 'loading'}/>
            </Group>
        </form>
    );
}

export function Content({user}){
    return (
        <>
            <EditCard title="Yleiset">
                <EmailSettingsForm email={user.email}/>
                <PasswordSettingsForm email={user.email}/>
            </EditCard>

            <EditCard title="Tilaus">
                <SingleSelectForm inputComponent={Select} childComponent={Select.Option} initialInputProps={{
                    name: 'plan',
                    label: "Tilaus",
                    description: 'Tilauksen tyyppi.',
                    defaultValue: 'regular',
                }} childProps={[
                    {
                        value: 'regular',
                        children: 'Perus',
                    },
                    {
                        value: 'pro',
                        children: 'Pro',
                    }
                ]} submitMethod={(value: object) => Promise.resolve({})}/>
            </EditCard>
        </>
    )
}