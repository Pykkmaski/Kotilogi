import { fileNameTimestampSeparator } from "kotilogi-app/constants";
import Database from "./database";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { unlink, writeFile } from "fs/promises";

class Files{
    async upload(file: File){
        let savedFileInfo: Kotilogi.FileType | null = null;

        try{
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
    
            const fileName = Date.now() + fileNameTimestampSeparator + file.name;
            await writeFile(uploadPath + fileName, buffer).then(() => {

                savedFileInfo = {
                    fileName,
                    title: fileName,
                    mimeType: file.type as Kotilogi.MimeType,
                } as Kotilogi.FileType;

            });

            return savedFileInfo;
        }
        catch(err){
            console.log(err.message);
            throw err;
        }
    }

    async unlink(fileName: string){
        await unlink(uploadPath + fileName);
    }
}

export const files = new Files();