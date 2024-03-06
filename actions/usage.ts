'use server';
import { revalidatePath } from 'next/cache';
import * as database from './database';
import {z} from 'zod';
import db from 'kotilogi-app/dbconfig';

const TABLENAME = 'usage';
const PATH = '/properties/[property_id]/usage';

const revalidateUsage = () => revalidatePath(PATH, 'page');

export async function getByDateRange(startDate: number, endDate: number, query: Partial<Kotilogi.UsageType>){
    const data = await database.get(TABLENAME, query);
    return data.filter(d => {
        const time = parseInt(d.time);
        return time >= startDate && time <= endDate;
    });
}

export async function getByYear(year: number, query: Partial<Kotilogi.UsageType>){
    const data = await database.get<Partial<Kotilogi.UsageType>>(TABLENAME, query);

    return data.filter(d => {
        const dataYear = new Date(d.time).getFullYear();
        if(dataYear === year){
            return d;
        }
    });
}

type UsageValidationResult = 'valid' | 'invalid_date';

function validateUsageData(data: Kotilogi.UsageType){
    const currentTime = Date.now();
    const dataTime = new Date(data.time).getTime();
    if(Number.isNaN(dataTime)) throw new Error('Error validating usage data! Passed data time parses to NaN ' + `(${data.time})`);
    if(dataTime > currentTime){
        return 'invalid_date';
    }
    else{
        return 'valid';
    }
}

export async function get(query: Partial<Kotilogi.UsageType>, year: string = 'all'){
    if(year === 'all'){
        //Return all data.
        return db(TABLENAME).where(query) as unknown as Kotilogi.UsageType[];
    }
    else{
        return db(TABLENAME).where(query).whereLike('time', `%${year}%`) as unknown as Kotilogi.UsageType[];
    }
}

export async function add(usageData: Kotilogi.UsageType){
    const validationResult = validateUsageData(usageData);
    if(validationResult !== 'valid') throw new Error(validationResult);
    
    return await database.add('usage', usageData)
    .then(() => revalidateUsage());
}

export async function del(usageData: Kotilogi.UsageType){
    return await database.del(TABLENAME, {id: usageData.id})
    .then(() => revalidateUsage());
}

export async function update(usageData: Kotilogi.UsageType){
    return await database.update(TABLENAME, usageData.id, usageData)
    .then(() => revalidateUsage());
}