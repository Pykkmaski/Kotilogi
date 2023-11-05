'use client';

import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form";
import { MIN_PASSWORD_LENGTH } from "kotilogi-app/constants";
import { useState } from "react";

type Props = {
    user: any,
}

export default function SettingsForm(props: Props){

    const [hasChanged, setHasChanged] = useState(false);
    const [hasNewPassword, setHasNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        setLoading(true);
    }
    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <label>Sähköpostiosoite</label>
                <input type="email" placeholder={props.user.email} name="email" onChange={() => setHasChanged(true)}/>
            </Form.Group>

            <Form.Group>
                <label>Vaihda Salasanasi</label>
                <input type="password" autoComplete="off" name="password1" onChange={() => {
                    setHasChanged(true);
                    if(!hasNewPassword) setHasNewPassword(true);
                }}/>
                <Form.SubLabel>Salasanan tulee olla vähintään {MIN_PASSWORD_LENGTH} merkkiä pitkä</Form.SubLabel>
            </Form.Group>

            <Form.Group>
                <label>Vahvista Uusi Salasana</label>
                <input type="password" autoComplete="off" name="password2" disabled={!hasNewPassword}/>
            </Form.Group>

            <Form.ButtonGroup>
                <Button
                    type="submit"
                    className="primary"
                    disabled={!hasChanged || loading}
                    desktopText="Tallenna Muutokset"
                    loading={loading}
                />
            </Form.ButtonGroup>
        </Form>
    )
}