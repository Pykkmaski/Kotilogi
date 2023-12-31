'use client';

import {receiveOwnership } from "kotilogi-app/actions/property/receiveOwnership";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import { Input } from "kotilogi-app/components/Input/Input";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function ReceivePropertyForm(props: {
    newOwner: string,
}){

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [code, setCode] = useState<string>('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        receiveOwnership(code, props.newOwner)
        .then(() => {
            router.push('/auth/properties');
            toast.success('Omistajuus vastaanotettu!');
        })
        .catch(err => toast.error(err.message))
        .finally(() => setLoading(false));
    }

    return (
        <>
            <p>Oletko saanut varmenteen? Kirjoita se tähän, niin saat varmenteen viittaaman talon omistajuuden itsellesi. <br/></p>
            <Form onSubmit={onSubmitHandler}>
                <Input
                    label="Varmenne"
                    name="transferCode"
                    type="password"
                    placeholder="Kirjoita varmenne..."
                    onChange={(e) => setCode(e.target.value)}/>

                <Form.Group>
                    <PrimaryButton desktopText="Lähetä" loading={loading} disabled={loading || code.length == 0} type="submit"/>
                </Form.Group>
            </Form>
        </>
        
    )
}