'use client';

import Button from 'kotilogi-app/components/Button/Button';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import style from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import Form from 'kotilogi-app/components/Form';
import GeneralSection from './GeneralSection';
import { useState } from 'react';
import serverUpdateDataById from 'kotilogi-app/actions/serverUpdateDataById';
import toast from 'react-hot-toast';
import useData from 'kotilogi-app/hooks/useData';
import InteriorSection from './InteriorSection';
import BuildingSection from './BuildingSection';
import Link from 'next/link';
import ExteriorSection from './ExteriorSection';
import HeatingSection from './HeatingSection';
import NavBar from 'kotilogi-app/components/NavBar/NavBar';
import serverRevalidatePath from 'kotilogi-app/actions/serverRevalidatePath';

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
                <nav className={style.navBar}>
                    <Link href="?section=general">Yleistiedot</Link>
                    <Link href="?section=building">Rakennus</Link>
                    <Link href="?section=exterior" hidden={currentData.buildingType === 'Kerrostalo'}>Tontti</Link>
                    <Link href="?section=interior">Sisätilat</Link>
                    <Link href="?section=heating">Lämmitys</Link>
                </nav>

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
                {
                    section === 'general' ? <GeneralSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                    :
                    section === 'interior' ? <InteriorSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                    :
                    section === 'exterior' ? <ExteriorSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                    :
                    section === 'building' ? <BuildingSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                    :
                    section === 'heating' ? <HeatingSection currentData={currentData} onChangeHandler={onChangeHandler}/>
                    :
                    null
                }
            </Form>
       </section> 
    );
}