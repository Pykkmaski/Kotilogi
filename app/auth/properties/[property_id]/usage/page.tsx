"use client";

import styles from './page.module.scss';
import {serverGetDataById} from 'kotilogi-app/actions/serverGetData';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import { throwErrorIfNull } from 'kotilogi-app/utils/throwErrorIfNull';
import HeatingChart from './heatingChart';
import ClientProvider from './ClientContext';
import { useState } from 'react';
import useData from 'kotilogi-app/hooks/useData';

export default async function UsagePage({params}){
    const property = useData('properties', {id: params.id}, true) as PropertyType;
    if(!property) return null;
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <h1>{property!.address}</h1>
                    <small>Kulutustiedot</small>
                </div>
                
                <select name="usageSection">
                    <option value="heating">Lämmitys</option>
                </select>
            </div>

            <main>
                <HeatingChart/>
            </main>
        </div>  
    )
}