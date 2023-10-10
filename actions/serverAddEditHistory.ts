import db from "kotilogi-app/dbconfig";

export default async function serverAddEditHistory(columnName: string, tableName: string, previousValue: string, currentValue: string): Promise<void>{
    try{
        const entry = {
            columnName,
            tableName,
            previousValue,
            currentValue,
            timestamp: Date.now(),
        };

        await db('editHistory').insert(entry);
    }
    catch(err){
        console.log(err.message);
    }
}