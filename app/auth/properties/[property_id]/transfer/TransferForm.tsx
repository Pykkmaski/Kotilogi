'use client';

import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import style from './style.module.scss';
import createPropertyTransferOrder from "kotilogi-app/utils/createPropertyTransferOrder";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function TransferForm(){
    
    const {property_id} = useParams();
    const [error, setError] = useState(-1);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await createPropertyTransferOrder(property_id as string, e.target.email.value);
        if(!success) {
            setError(1);
        }
        else{
            setError(0);
        }
        setLoading(false);

        setTimeout(() => setError(-1), 3000);
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Vastaanottavan käyttäjän sähköpostiosoite</label>
                <input type="email" required name="email" autoComplete="off"></input>
            </Form.Group>

            <Form.Group>
                <label>Anna salasanasi</label>
                <input type="password" required name="password" autoComplete="off"></input>
            </Form.Group>

            <Form.Group className={style.horizontalRow}>
                <label>Ymmärrän, että talon omistajuuden siirto on pysyvä:</label>
                <input type="checkbox" required></input>
            </Form.Group>

            <Form.ButtonGroup>
                <Button
                    className="primary"
                    desktopText="Luo Varmenne"
                    type="submit"
                    disabled={loading}
                    loading={loading}
                />
            </Form.ButtonGroup>
            
            {
                error === 0 ? <Form.Success>Varmenne luotu onnistuneesti!</Form.Success>
                :
                error === 1 ? <Form.Error>Varmenteen luominen epäonnistui!</Form.Error>
                :
                null
            }
        </Form>
    );
}