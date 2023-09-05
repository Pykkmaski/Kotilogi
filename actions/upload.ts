import multer from 'multer';

export async function upload(file: any): Promise<boolean>{
    try{
        console.log(file);
        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}