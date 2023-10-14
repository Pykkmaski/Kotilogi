'use client';

import Form from "kotilogi-app/components/Form";
import getInputElementByLabel from "../../Util/getInputElementByLabel";
import lang from "kotilogi-app/kotilogi.lang";
import style from './style.module.scss';
import { useEffect, useRef, useState } from "react";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import toast from "react-hot-toast";
import * as Constants from 'kotilogi-app/constants';

type Props = {
    property: Kotilogi.PropertyType,
}
export default async function EditForm(props: Props){
    const data = useRef(props.property);
    const updateTimeout = useRef<any>(null);
    const buildingTypeRef = useRef();
    const yardAreaRef = useRef();
    const yardOwnershipRef = useRef();

    const updateData = async (e) => {
        data.current = {
            ...data.current,
            [e.target.name] : e.target.value,
        }

        if(updateTimeout.current) clearTimeout(updateTimeout.current);

        updateTimeout.current = setTimeout(() => {
            serverUpdateDataById(data.current, props.property.id, 'properties')
            .then(result => {
                if(!result){
                    toast.error('Tietojen päivitys epäonnistui!');
                }
            });
        }, 100);
        
    }

    function getTotalArea(a: number | undefined | string, b: number | undefined | string){
        if(typeof a === 'undefined' || typeof b === 'undefined'){
            return undefined;
        }

        var param1: number, param2: number;
        param1 = typeof a === 'string' ? parseFloat(a) : a;
        param2 = typeof b === 'string' ? parseFloat(b) : b;

        return param1 + param2;
    }

    const content = Object.entries(props.property).map((entry, index: number) => {
        if(!lang.properties[entry[0]]) return null;
        
        const label: string = lang.properties[entry[0]]['fi'];
        const value = entry[1];

        if(props.property.buildingType == 'Kerrostalo' && entry[0] == Constants.PropertyColumns.YARD_AREA.LABEL || entry[0] == Constants.PropertyColumns.YARD_OWNERSHIP.LABEL){
            return null;
        }

        const inputElement = getInputElementByLabel(entry[0], entry[1], updateData);

        const row = (
           <Form.Group className={style.formGroup}>
                <label>{label}</label>
                {inputElement}
           </Form.Group>
        );

        return row;
    });

    
    return (
        <Form className={style.editForm}>
            {content}
        </Form>
    )
}