'use client';

import Form from "kotilogi-app/components/Form";
import getInputElementByLabel from "../../Util/getInputElementByLabel";
import { useRef, useState } from "react";
import lang from "kotilogi-app/kotilogi.lang";
import * as Constants from 'kotilogi-app/constants';
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import toast from "react-hot-toast";
import style from './style.module.scss';

type Props = {
    property: Kotilogi.PropertyType,
}

export default function FormContent(props: Props){
    const [data, setData] = useState(props.property);

    const updateTimeout = useRef<any>(null);
    
    const updateData = async (e) => {
        const newData = {
            ...data,
            [e.target.name] : e.target.value,
        }

        if(updateTimeout.current) clearTimeout(updateTimeout.current);

        updateTimeout.current = setTimeout(() => {
            serverUpdateDataById(newData, props.property.id, 'properties')
            .then(result => {
                if(!result){
                    toast.error('Tietojen päivitys epäonnistui!');
                }
            })
            .finally(() => {
                setData(newData);
            });
        }, 100);
    }

    const content = Object.entries(data).map((entry, index: number) => {
        if(!lang.properties[entry[0]]) return null;
        
        const label: string = entry[0];
        const value = entry[1];

        if(data.buildingType == 'Kerrostalo' && label == Constants.PropertyColumns.YARD_AREA.LABEL || label == Constants.PropertyColumns.YARD_OWNERSHIP.LABEL){
            return null;
        }

        const inputElement = getInputElementByLabel(entry[0], entry[1], updateData);
        const labelTranslated = lang.properties[label]['fi'];

        const row = (
           <Form.Group className={style.formGroup}>
                <label>{labelTranslated}</label>
                {inputElement}
           </Form.Group>
        );

        return row;
    });
    
    return (
        <>
            {content}
        </>
    );
}