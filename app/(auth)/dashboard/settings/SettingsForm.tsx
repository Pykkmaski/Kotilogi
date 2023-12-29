'use client';

import { serverGetData } from "kotilogi-app/actions/serverGetData";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import { Input } from "kotilogi-app/components/Input/Input";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

type DataT = {
    email: string,
}

function useSettingsForm(email: string){
    const data = useRef<DataT>({email: email});

    useEffect(() => {
        serverGetData('users', {email}, true)
        .then(res => {
            if(res) data.current = res;
        })
        .catch(err => toast.error(err.message))
    }, []);

    return data;
}

export function SettingsForm(props: {
    email: string,
}){
    const data = useSettingsForm(props.email);

    return (
        <Form>
            <Input
                label="Sähköpostiosoite"
                name="email"
                required={true}
                defaultValue={data.current.email}
                placeholder="Kirjoita sähköpostiosoitteesi"/>

            <Form.Group>
                <PrimaryButton desktopText="Päivitä"/>
            </Form.Group>
        </Form>
    );
}