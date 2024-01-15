import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import style from './page.module.scss';
import { Input } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { Group } from "kotilogi-app/components/Group/Group";
import { useInputData, useStatus } from "kotilogi-app/components/Modals/BaseAddModal.hooks";
import { updateEmail, updatePassword } from "kotilogi-app/actions/user/updateUser";
import toast from "react-hot-toast";

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

    const {data, updateData} = useInputData({email});
    const [status, setStatus] = useStatus('idle');

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
            })
            .catch(err => {
                toast.error(err.message);
                setStatus('error');
            });
        }
    }

    const submitDisabled = status === 'loading' || status === 'success';

    return (
        <form onSubmit={onSubmit}>
            <Input type="password" placeholder="Kirjoita uusi salasana..." autoComplete="off" name="password1"
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
                <PrimaryButton desktopText="Päivitä" type="submit" 
                    disabled={submitDisabled}
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
        </>
    )
}