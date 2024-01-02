'use client';

import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import Button from "kotilogi-app/components/Button/Button";
import Form from "kotilogi-app/components/Form/Form";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import style from './style.module.scss';
import Image from "next/image";
import { useEventContext } from "./EventContext";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { useChangeInput } from "kotilogi-app/hooks/useChangeInput";
import { updatePropertyEvent } from "kotilogi-app/actions/propertyEvent/updatePropertyEvent";

export default function EditForm(){

    const {event, property} = useEventContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {data, isEdited, resetIsEdited, onChange: onChangeHandler} = useChangeInput({...event});

    const formId = `event-edit-form-${event.id}`;

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        updatePropertyEvent(data)
        .then(updatedData => {
            toast.success('Tapahtuman päivitys onnistui!');
            resetIsEdited();
        })
        .catch(err => toast.error('Tapahtuman päivitys epäonnistui!'))
        .finally(() => setLoading(false));
    }

    return (
        <Form id={formId} onSubmit={onSubmitHandler}>
            <Heading>Muokkaa Tapahtumaa</Heading>
            <Form.Group>
                <label>Otsikko<span className="danger">*</span></label>
                <input name="title" required={true} defaultValue={event.title} placeholder="Kirjoita tapahtumalle otsikko..." onChange={onChangeHandler}></input>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" defaultValue={event.description} placeholder="Kirjoita tapahtumalle kuvaus..." spellCheck={false} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Päivämäärä</label>
                <input type="date" name="time" defaultValue={event.time} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group direction="horizontal">
                <Button
                    className="secondary"
                    desktopText="Takaisin Tapahtumiin"
                    onClick={() => {
                        if(isEdited){
                            const res = confirm('Tapahtumalla on tallentamattomia muutoksia. Haluatko jaktaa tallentamatta?');
                            if(!res) return;
                        } 

                        router.push(`/properties/${event.refId}/events`);
                       
                    }}
                    disabled={loading}
                />

                <Button
                    className="primary"
                    desktopText="Tallenna"
                    type="submit"
                    form={formId}
                    loading={loading}
                    disabled={loading || !isEdited}
                />
            </Form.Group>

            <div className={style.eventInfo} title="Tapahtuman sisältävä talo">
                <Image
                    width={25}
                    height={25}
                    src={'/icons/house.png'}
                    alt=""
                    className={style.icon}
                />
                <i className={style.eventId}>{property.title}</i>
            </div>
        </Form>
    );
}