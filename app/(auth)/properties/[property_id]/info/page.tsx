'use client';

import Button from 'kotilogi-app/components/Button/Button';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import style from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import Form from 'kotilogi-app/components/Form/Form';
import GeneralSection from './GeneralSection';
import { useState } from 'react';
import {updateDataById} from 'kotilogi-app/actions/data/updateData';
import toast from 'react-hot-toast';
import InteriorSection from './InteriorSection';
import BuildingSection from './BuildingSection';
import ExteriorSection from './ExteriorSection';
import HeatingSection from './HeatingSection';
import serverRevalidatePath from 'kotilogi-app/actions/serverRevalidatePath';
import RoofSection from './RoofSection';
import { useChangeInput } from 'kotilogi-app/hooks/useChangeInput';

export default function InfoPage(){
    const params = useSearchParams();
    const {property} = usePropertyContext();
    const {data, onChange, isEdited, resetIsEdited} = useChangeInput({...property});

    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        updateDataById(data, property.id, 'properties')
        .then(async res => {
            toast.success('Tietojen päivitys onnistui!');
            resetIsEdited();
            await serverRevalidatePath('/properties/[property_id]');
        })
        .catch(err => toast.error(err.message))
        .finally(() => setLoading(false));
    }

    const formId = 'property-info-form';

    return (
       <main className={style.body}>
            <div className={style.header}>
                <Button
                    type="submit"
                    className="primary"
                    form={formId}
                    desktopText='Tallenna Muutokset'
                    disabled={!isEdited || loading}
                    loading={loading}
                />
            </div>
            

            <Form onSubmit={onSubmitHandler} className={style.propertyForm} id={formId}>
                <GeneralSection currentData={data} onChangeHandler={onChange}/>
                <BuildingSection currentData={data} onChangeHandler={onChange}/>
                <InteriorSection currentData={data} onChangeHandler={onChange}/>
                {
                    data.buildingType !== 'Kerrostalo' ? 
                    <ExteriorSection currentData={data} onChangeHandler={onChange}/>
                    :
                    null
                }
                
                <HeatingSection currentData={data} onChangeHandler={onChange}/>
                <RoofSection currentData={data} onChangeHandler={onChange}/>
            </Form>
       </main> 
    );
}