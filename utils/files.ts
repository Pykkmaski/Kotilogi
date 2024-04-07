import { readFile, unlink, writeFile } from "fs/promises";
import { Knex } from "knex";
import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";

type ModeType = 'save' | 'delete';

export class Files{
    private fileName: string | null;

    private backups: {
        fileName: string,
        buffer?: Buffer,
    }[] = [];

    private mode: ModeType; 
    private success: boolean = false;

    private validate(file: File){
        const size = file.size;
        const type = file.type;

        if(type !== 'application/pdf' && type !== 'image/jpeg'){
            throw new Error('Received file of invalid type! ' + type);
        }
    }

    private reset(){
        this.backups = [];
        this.success = false;
        this.fileName = null;
    }

    async rollbackFiles(){
        if(this.success){
            try{
                if(this.mode === 'save'){
                    const promises = this.backups.map(backup => unlink(uploadPath + backup.fileName));
                    await Promise.all(promises);
                }
                else if(this.mode === 'delete'){
                    const promises = this.backups.map(backup => writeFile(uploadPath + backup.fileName, backup.buffer))
                    await Promise.all(promises);
                }

                this.reset();
            }
            catch(err){
                console.log('File rollback failed!');
            }
        }
    }

    private async upload(file: File){
        this.validate(file);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = Date.now() + fileNameTimestampSeparator + file.name;

        await writeFile(uploadPath + fileName, buffer).then(() => {
            this.backups.push({
                buffer,
                fileName,
            });

            this.fileName = fileName;
            this.success = true;
        });

        return {
            title: fileName,
            fileName,
            mimeType: file.type,
        }
    }

    async addFile(tablename: string, file: File, refId: string, trx?: Knex.Transaction){
        this.mode = 'save';
        const dbcon = trx || db;
        
        try{
            const data = await this.upload(file);
            await dbcon(tablename).insert({
                ...data,
                refId,
            });
        }
        catch(err){
            console.log(err.message);

            if(!trx){
                await this.rollbackFiles();
            }
            
            throw err;
        }
    }

    async deleteFile(tablename: string, fileName: string, trx?: Knex.Transaction){
        this.mode = 'delete';
        const dbcon = trx || db;
        try{
            this.backups.push({
                buffer: await readFile(uploadPath + fileName),
                fileName,
            });

            await unlink(uploadPath + fileName).then(() => {
                this.success = true;
                this.fileName = fileName;
            });

            await dbcon(tablename).where({fileName}).del();
        }
        catch(err){
            console.log(err.message);

            if(!trx){
                await this.rollbackFiles();
            }
            
            throw err;
        }
    }
}