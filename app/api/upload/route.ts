import {upload} from './multerConfig';

export async function POST(req, res) {
  try{
    const middleware = upload.single('image');
    middleware(req, res, (err) => {
        if(err){
            console.log('Error uploading file');
        }

        console.log('At middleware');
    });
  }
  catch(err){
    console.log('Failed to upload image!');
  }
}
