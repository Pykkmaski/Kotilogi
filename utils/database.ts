import db from "kotilogi-app/dbconfig";
import { billing } from "./billing";
import { Knex } from "knex";
import { files } from "./files";

interface Transactor{
    transact<DataT extends Kotilogi.ItemType, T extends Knex.Transaction>(data: DataT, trx: T): Promise<T>; 
}

export default abstract class Database<T extends Kotilogi.ItemType>{
    private m_tablename: string;

    constructor(tablename: string){
        this.m_tablename = tablename;
    }

    get tablename(){
        return this.m_tablename;
    }

    table(){
        return db(this.tablename);
    }

    transaction(){
        return db.transaction();
    }

    async upload(file: File, refId: string){

    }

    /**
     * Creates a transaction, and adds the passed data through it, then returns the transaction for further use.
     * @param data 
     * @param fdata 
     * @returns 
     */
    async transact(data: T, fdata?: FormData[]){
        let insertedFileInfo: Kotilogi.FileType[] = [];
        const trx = await this.transaction();

        try{
            const [id] = await this.table().insert(data, 'id').transacting(trx) as unknown as number[];

            if(fdata){
                const filePromises: Promise<Kotilogi.FileType>[] = [];

                for(const file of fdata){
                    const f = file.get('file') as unknown as File;
                    filePromises.push(files.upload(f))
                }

                await Promise.allSettled(filePromises).then(results => {
                    let rejectedCount: number = 0;

                    results.forEach(result => {
                        if(result.status === 'fulfilled'){
                            insertedFileInfo.push(result.value);
                        }
                        else{
                            rejectedCount++;
                        }
                    });

                    if(rejectedCount > 0){
                        throw new Error('Some files failed to upload!');
                    } 
                });

                //Save the inserted file's info into the database.
                const dataPromises: Promise<void>[] = [];
                for(const info of insertedFileInfo){
                    dataPromises.push(
                        this.table().insert({
                            ...info,
                            refId: id,
                        }).transacting(trx) as unknown as Promise<void>
                    )
                }
            }

            return trx;
        }
        catch(err){
            try{
                //Delete the files that were uploaded.
                for(const info of insertedFileInfo){
                    await files.unlink(info.fileName);
                }
            }
            catch(err){
                throw err;
            }
            
            throw err;
        }
    }
}

/**
 * For extending database connections that should add a bill when an item is inserted.
 */
export abstract class CreatesBills<T extends Kotilogi.ItemType> extends Database<T>{
    /**
     * The amount charged for each item inserted.
     */
    private m_amountCharged: number;

    constructor(tablename: string, amountCharged: number){
        super(tablename);
        this.m_amountCharged = amountCharged;
    }

    get amountCharged(){
        return this.m_amountCharged;
    }

    async add(data: T, fdata?: FormData[]){
        let trx: Knex.Transaction;

        try{
            trx = await super.transact(data, fdata);
            const bill = billing.createBill(data.refId, this.amountCharged);
            await db('billing').insert(bill).transacting(trx);

            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            throw err;
        }
        
    }
}
