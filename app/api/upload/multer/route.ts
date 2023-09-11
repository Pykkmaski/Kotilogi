import upload from 'kotilogi-app/multer.config';
import { NextResponse } from 'next/server';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    }
}

export async function POST(req, res){
    try{
        upload.single('file')(req, res, err => {
            if(err){
                return new NextResponse(null, {
                    status: 500,
                    statusText: 'File upload failed due to a multer error',
                });
            }

            console.log(req.file);
        });

        return new NextResponse(null, {
            status: 201,
            statusText: 'File uploaded successfully!',
        })
    }
    catch(err){
        console.log(err.message);
    }
}