'use client';

import axios from "axios";

export default function Page(){

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            const file = e.target.image.files[0];
            if(!file) throw new Error('File missing!');

            const data = new FormData();
            data.set('file', file);
            data.set('dbTableName', 'property_files');
            data.set('title', 'Test Title');
            data.set('description', 'Test Description');
            data.set('target_id', '99');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
    
            if(!res.ok) throw new Error(await res.text());
            console.log('File uploaded successfully!');
        }
        catch(err){
            console.log(err);
        }
        
    }

    return (
        <main>
            <form onSubmit={onSubmitHandler}>
                <input type="file" accept="image/jpeg" name="image"></input>
                <button type="submit">Send</button>
            </form>
        </main>
    )
}