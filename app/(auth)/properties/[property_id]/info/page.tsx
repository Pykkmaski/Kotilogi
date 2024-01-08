'use client';

import Button from 'kotilogi-app/components/Button/Button';
import { usePropertyContext } from '../_util/PropertyContextProvider';
import style from './page.module.scss';
import { useSearchParams } from 'next/navigation';
import Form from 'kotilogi-app/components/Form/Form';
import GeneralSection from './GeneralSection';
import { createContext, useContext, useState } from 'react';
import {updateDataById} from 'kotilogi-app/actions/data/updateData';
import toast from 'react-hot-toast';
import InteriorSection from './InteriorSection';
import BuildingSection from './BuildingSection';
import ExteriorSection from './ExteriorSection';
import HeatingSection from './HeatingSection';
import serverRevalidatePath from 'kotilogi-app/actions/serverRevalidatePath';
import RoofSection from './RoofSection';
import { useChangeInput } from 'kotilogi-app/hooks/useChangeInput';
import { Header } from '@/components/Header/Header';
import { Group } from 'kotilogi-app/components/Group/Group';

type InfoPageContextProps = {
    onUpdate: (data: object) => Promise<object>
}

const InfoPageContext = createContext<InfoPageContextProps | null>(null);

export function useInfoPageContext(){
    const context = useContext(InfoPageContext);
    if(!context) throw new Error('useInfoPageContext must be used within the scope of the InfoPageContext!');
    return context;
}

export default function InfoPage(){
    const params = useSearchParams();
    const {property} = usePropertyContext();
    const {data, onChange, isEdited, resetIsEdited} = useChangeInput({...property});

    const [loading, setLoading] = useState(false);

    const onUpdate = async (data: object) => {
        return updateDataById(data, property.id, 'properties');
    }

    const formId = 'property-info-form';

    return (
       <main className={style.body}>
            <Header>
                <h3>Tiedot</h3>
            </Header>
            
            <Group direction="vertical" gap="1rem">
                <InfoPageContext.Provider value={{onUpdate}}>
                    <GeneralSection currentData={data} onChangeHandler={onChange}/>
                </InfoPageContext.Provider>
            </Group>
            
       </main> 
    );
}