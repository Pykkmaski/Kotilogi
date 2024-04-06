import { readdir, unlink } from "fs/promises";
import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';

/**
 * An api route to clean up any files that don't have a database entry.
 * @param req 
 */
export async function GET(req: NextRequest){
    try{
        var filesDeleted = 0;

        const files = await readdir(uploadPath);
        for(const fileName of files){
            console.log(fileName);
            const dbData = await db('propertyFiles').where({fileName}).then(async ([file]) => {
                if(!file){
                    const [eventFile] = await db('eventFiles').where({fileName});
                    return eventFile;
                }
                else{
                    return file;
                }
            });

            if(!dbData){
                await unlink(uploadPath + fileName)
                .then(() => filesDeleted++)
                .catch(err => console.log('Failed to delete ' + fileName));
            }
        }

        return new NextResponse(`Unpaired files deleted: ${filesDeleted}`, {
            status: 200,
        });
    }
    catch(err){
        console.log(err.message);
        return new NextResponse(null, {
            status: 500,
        });
    }
}