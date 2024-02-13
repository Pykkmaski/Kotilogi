import db from "kotilogi-app/dbconfig";
import { writeFile } from "fs/promises";

const path = require('path');
const env = process.env.UPLOAD_ENV || 'development';
const uploadSizeLimit = process.env.UPLOAD_FILESIZE_LIMIT;

type FileTable = 'propertyFiles' | 'eventFiles';


export abstract class Database<T extends {}>{
    private tablename: string = '';

    constructor(tablename: string){
        this.tablename = tablename;
    }

    async add(data: Partial<T>, files?: FormData[]){
        return db(this.tablename).insert(data, '*');
    }

    async get(query: T){
        return db(this.tablename).where(query) as T[];
    }

    async count(query: Partial<T>){
        return db(this.tablename).where(query).count('*', {as: 'count'}) as {count: number};
    }
}

export abstract class WithFiles<T extends {}> extends Database<T>{

    private fileNameTimestampSeparator: string = '--';

    private uploadPath =  env === 'development' ? path.join(process.cwd(), '/uploads/') : process.env.UPLOAD_PATH;
    private sizeLimit: number = uploadSizeLimit ? parseInt(uploadSizeLimit) : 1024 * 1024 * 5;
    private fileTablename: string;

    constructor(tablename: string, fileTablename: FileTable){
        super(tablename);
        this.fileTablename = fileTablename;
    }

    private verifyFile(file: File){
        if(!file){
            throw new Error('no_file');
        }

        //Only allow PDF's or JPEG's
        const fileType: string = file.type;

        if(fileType !== 'application/pdf' && fileType !== 'image/jpeg'){
            throw new Error('unsupported');
        }

        //Only process files within an allowed size.
        if(file.size > this.sizeLimit) {
            throw new Error('invalid_size');
        }
    }

    private async upload(file: File, refId: Kotilogi.IdType){
        return new Promise<string>(async (resolve, reject) => {
            try{
                this.verifyFile(file);

                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
            
                const fileName = Date.now() + this.fileNameTimestampSeparator + file.name;
            
                await writeFile(this.uploadPath + fileName, buffer);

                await db(this.fileTablename).insert({
                    title: fileName,
                    refId,
                    fileName,
                    mimeType: file.type as any,
                });

                resolve(fileName);
            }
            catch(err){
                console.log(err.message);
                reject(err);
            }
        });
    }

    async add(data: T, fdata?: FormData[]){
        return new Promise<string>(async (resolve, reject) => {
            try{
                const addedData = await super.add(data);

                if(fdata){
                    const files = fdata.map(f => f.get('files') as unknown as File);
                    const filePromises: Promise<string>[] = [];
            
                    for(const file of files){
                        filePromises.push(this.upload(file, addedData.id));
                    }
            
                    await Promise.all(filePromises);
                }
                
                resolve('success');
            }
            catch(err){
                console.log(err.message);
                reject(err);
            }
        });
    }
}