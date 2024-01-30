'use client';

import { updateEmail } from "kotilogi-app/actions/user/updateEmail";
import { Input } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import toast from "react-hot-toast";
import {z} from 'zod';

const EmailSchema = z.object({
    email: z.string().email(),
});

export function EmailSettingsForm({email}){

    const submitMethod = async (newData: {email: string}) => {
        const result = EmailSchema.safeParse(newData);

        if(!result.success){
            return Promise.reject(result.error.message);
        }
        else{
            return updateEmail(email, newData.email);
        }
    }

    return (
        <SingleInputForm 
            submitMethod={submitMethod}
            editingDisabled={true}
            inputComponent={Input}
            initialInputProps={{
                name: 'email',
                label: 'Sähköpostiosoite',
                description: 'Päivitä sähköpostiosoitteesi.',
                defaultValue: email,
                type: 'email',
            }}/>
    );
}