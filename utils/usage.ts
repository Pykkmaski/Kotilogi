import db from "kotilogi-app/dbconfig";
import { Database } from "./database";

class Usage extends Database<Kotilogi.UsageType>{
    constructor(){
        super('usage');
    }

    async add(data: Partial<Kotilogi.UsageType>){
        data.time = Date.now().toString();
        return super.add(data);
    }

    async getByDateRange(startDate: number, endDate: number, query: Kotilogi.UsageType){
        return new Promise<Kotilogi.UsageType[]>(async (resolve, reject) => {
            try{
                const data = await db(this.tablename).where(query);
                resolve(
                    data.filter(d => {
                        const time = parseInt(d.time);
                        return time >= startDate || time <= endDate;
                    })
                )
            }
            catch(err){
                reject(err);
            }
        });
    }
}

export const usage = new Usage();