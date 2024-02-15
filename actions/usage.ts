'use server';
import * as database from './database';

const TABLENAME = 'usage';

export async function getByDateRange(startDate: number, endDate: number, query: Partial<Kotilogi.UsageType>){
    const data = await database.get(TABLENAME, query);
    return data.filter(d => {
        const time = parseInt(d.time);
        return time >= startDate && time <= endDate;
    });
}