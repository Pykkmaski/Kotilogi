import updateUser from "kotilogi-app/actions/updateUser";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { useState } from "react";
import style from './page.module.scss';

export function Header(){
    return (
        <div className={style.header}>
            <h3>Asetukset</h3>
        </div>
    );
}

function FormButtonContainer({children}){
    return (
        <div style={{
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'flex-end',
        }}>
            {children}
        </div>  
    );
}

function FormContentWrapper({children}){
    return (
        <div className={style.formContentWrapper}>
            {children}
        </div>
    );
}

export function EmailSettingsForm({email}){

    const [loading, setLoading] = useState(false);
    const {data, onChange, isEdited, resetIsEdited} = useChangeInput({email});

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateUser(email, data)
        .catch(err => console.log(err.message))
        .finally(() => {
            setLoading(false);
            resetIsEdited();
        });
    }

    return (
        <form onSubmit={onSubmit} className={style.form}>
            <FormContentWrapper>
                <Form.Group>
                    <label>Sähköposti</label>
                    <input required={true} type="email" name="email" placeholder="Kirjoita sähköpostiosoitteesi..." defaultValue={email} onChange={onChange}/>
                </Form.Group>
            </FormContentWrapper>
        </form>
    );
}

export function PasswordSettingsForm(){
    return (
        <FormContentWrapper>
            <Form.Group>
                <label>Anna Uusi Salasana</label>
                <input type="password" name="password1" placeholder="Kirjoita uusi salasana..."/>
            </Form.Group>
        </FormContentWrapper>
    );
}