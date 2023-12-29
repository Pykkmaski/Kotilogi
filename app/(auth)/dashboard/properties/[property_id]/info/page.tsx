'use client';

import Button from 'kotilogi-app/components/Button/Button';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import style from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import Form from 'kotilogi-app/components/Form/Form';
import GeneralSection from './GeneralSection';
import { useState } from 'react';
import serverUpdateDataById from 'kotilogi-app/actions/serverUpdateDataById';
import toast from 'react-hot-toast';
import InteriorSection from './InteriorSection';
import BuildingSection from './BuildingSection';
import Link from 'next/link';
import ExteriorSection from './ExteriorSection';
import HeatingSection from './HeatingSection';
import serverRevalidatePath from 'kotilogi-app/actions/serverRevalidatePath';
import RoofSection from './RoofSection';

export default function InfoPage(){
    const params = useSearchParams();
    const section = params.get('section');
    const {property} = usePropertyContext();
    const [currentData, setCurrentData] = useState({...property});
    const [loading, setLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await serverUpdateDataById(currentData, property.id, 'properties');
        if(!result){
            toast.error('Tietojen päivitys epäonnistui!');
        }
        else{
            toast.success('Tietojen päivitys onnistui!');
            setIsEdited(false);
            await serverRevalidatePath('/auth/properties/new/[property_id]');
        }

        setLoading(false);
    }

    const onChangeHandler = (e) => {
        setCurrentData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        });

        setIsEdited(true);
    }

    const formId = 'property-info-form';

    return (
       <section className={style.body}>
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
                <GeneralSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                <BuildingSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                <InteriorSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                {
                    currentData.buildingType !== 'Kerrostalo' ? 
                    <ExteriorSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                    :
                    null
                }
                
                <HeatingSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                <RoofSection currentData={currentData} onChangeHandler={onChangeHandler}/>
            </Form>
       </section> 
    );
}