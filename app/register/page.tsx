"use client";

import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { Input, Select } from 'kotilogi-app/components/Input/Input';
import { Group } from 'kotilogi-app/components/Group';
import {SecondaryButton} from 'kotilogi-app/components/Button/SecondaryButton';
import {PrimaryButton} from 'kotilogi-app/components/Button/PrimaryButton';
import { useInputData, useStatus } from 'kotilogi-app/components/Modals/BaseAddModal.hooks';
import { registerUser } from 'kotilogi-app/actions/registerUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Padding } from 'kotilogi-app/components/Util/Padding';
import Link from 'next/link';
import {z} from 'zod';
import toast from 'react-hot-toast';
import { ErrorText } from 'kotilogi-app/components/Util/Text';

function RegularPlanInfo(){
    return (
        <span className="text-slate-500">Olet valinnut tilauksesi tyypiksi perustilin. Perustilin vuosihinta on <span className="text-orange-500">19,90€.</span></span>
    );
}

function ProPlanInfo(){
    return (
        <span className="text-slate-500">Olet valinnut tilauksesi tyypiksi pro-tilin. Pro-tilin vuosihinta on <span className="text-orange-500">49,90€.</span></span>
    );
}

const RegisterSchema = z.object({
    email: z.string().email(),
    password1: z.string().min(8, 'password_len'),
    password2: z.string(),
    plan: z.enum(['pro', 'regular']),
});

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage(){
    const {data, updateData} = useInputData({plan: 'regular'});
    const [status, setStatus] = useStatus('idle');
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    const checkPasswordMatch = (password1: string, password2: string) => {
        return password1 === password2;
    }

    const register = (e) => {
        e.preventDefault();

        if(!checkPasswordMatch(data.password, e.target.password2.value)){
            setError('password_mismatch');
            return;
        }

        setStatus('loading');

        registerUser(data)
        .then(status => {
            toast.success('Rekisteröityminen onnistui!');
            setStatus('idle');
            setError(status);
            if(status === 'success'){
                router.replace('/login');
            }
        })
        .catch(err => {
            setStatus('error');
        });
    }

    const loading = status === 'loading';

    return (
        <main className="flex flex-col flex-1 justify-center items-center">
            <Padding>
                <ContentCard title={'Rekisteröidy'}>
                    <form onSubmit={register}>
                        <Group direction="col" gap={4}>
                            <Group direction="col" align="end">
                                <Input label="Sähköpostiosoite" description="Anna sähköpostiosoitteesi." onChange={updateData} required
                                    placeholder="Kirjoita sähköpostiosoite..." type="email" name="email"/>
                                {error === 'user_exists' ? <ErrorText>Tili annetulla osoitteella on jo olemassa!</ErrorText> : null}
                            </Group>
                        
                            <Group direction="col" align='end' gap={4}>
                                <Input label="Salasana" description="Anna tilille salasana." type="password" onChange={updateData} required
                                    placeholder="Kirjoita salasana..." autoComplete='new-password' name="password"/>

                                <Input label="Vahvista salasana" description="Kirjoita salasana uudelleen." type="password" required
                                    placeholder='Kirjoita salasana uudelleen...' autoComplete='new-password' name="password2" />

                                {error === 'password_mismatch' ? <ErrorText>Salasanat eivät täsmää</ErrorText> : null}
                            </Group>
                            
                            <div className="w-full items-end">
                                <Group direction="col" gap={2} align="end">
                                    <Select name="plan" label="Tilaustyyppi" description="Valitse tilauksesi tyyppi." onChange={updateData} required> 
                                        <Select.Option value="regular">Perus</Select.Option>
                                        <Select.Option value="pro">Pro</Select.Option>
                                    </Select>
                                    {
                                        data.plan === 'regular' ? <RegularPlanInfo/> : <ProPlanInfo/>
                                    }
                                </Group>
                            </div>
                        
                            <div className="w-full">
                                <Group direction="row" justify='between' align="center">
                                    <span>Olen lukenut kotilogin <Link href="/tos" target="_blank" className="text-orange-500">käyttöehdot</Link>:</span>
                                    <input className="aspect-square w-[20px]" type="checkbox" required />
                                </Group>
                            </div>

                            <div className="w-full mt-4 border-t-[1px] pt-[1rem]">
                                <Group direction="row" justify='end' gap={2}>
                                    <SecondaryButton disabled={loading} onClick={() => router.push('/')}>Peruuta</SecondaryButton>
                                    <PrimaryButton type="submit" disabled={loading} loading={loading}>Rekisteröidy</PrimaryButton>
                                </Group>
                            </div>
                        </Group>
                    </form>
                </ContentCard>
            </Padding>
        </main>
    )
}