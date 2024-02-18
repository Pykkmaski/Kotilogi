'use server';
import { revalidatePath } from 'next/cache';
import * as database from './database';
import {z} from 'zod';

const TABLENAME = 'usage';
const PATH = '/properties/[property_id]/usage';

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

export async function add(usageData: Kotilogi.UsageType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await database.add('usage', usageData);
            revalidatePath(PATH, 'page');
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

export async function del(usageData: Kotilogi.UsageType){
    return await database.del(TABLENAME, usageData)
    .then(() => revalidatePath(PATH));
}

export async function update(usageData: Kotilogi.UsageType){
    return await database.update(TABLENAME, usageData.id, usageData)
    .then(() => revalidatePath(PATH));
}