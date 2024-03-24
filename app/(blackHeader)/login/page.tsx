"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import {SecondaryButton} from 'kotilogi-app/components/Button/SecondaryButton';
import {PrimaryButton} from 'kotilogi-app/components/Button/PrimaryButton';
import { Input } from 'kotilogi-app/components/Input/Input';
import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { Group } from 'kotilogi-app/components/Group';
import Link from 'next/link';
import { Padding } from 'kotilogi-app/components/Util/Padding';
import { ErrorText } from '@/components/Util/Text';
import { useLogin } from './useLogin';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage(){
    const router = useRouter();
    //const {updateData} = useInputData({});
    const {loginHandler, updateData, status} = useLogin();
    const loginCode = parseInt(useSearchParams().get('code'));

    const cancelHandler = () => {
        router.push('/');
    }

    useEffect(() => {
        if(loginCode == 1){
            console.log(loginCode);
            toast.success('Käyttäjätili aktivoitu onnistuneesti!');
        }
    }, [loginCode]);

    const loading = status === 'loading';

    return (
        <main className="flex flex-col justify-center md:items-center xs:items-[none] flex-1">
            <Padding>
                <ContentCard title="Kirjaudu Sisään">
                    <form onSubmit={loginHandler} className="w-full flex flex-col xs:gap-4 md:gap-8">
                        <div className="flex flex-col gap-2">
                            <Input 
                                data-testid="login-email-input"
                                label="Sähköpostiosoite"
                                description='Sähköpostiosoite jolle tili on rekisteröity.'
                                type="email" 
                                name="email" 
                                required={true} 
                                placeholder="Kirjoita sähköpostiosoitteesi..."
                                onChange={updateData}
                                />

                            {
                                status === 'invalid_user' || status === 'trial_expired' || status === 'user_inactive' ? (
                                    <div className="w-full flex flex-row xs:justify-normal md:justify-end text-sm">
                                        {
                                            status === 'invalid_user' ? <ErrorText data-testid="invalid-user-error">Käyttäjää annetulla sähköpostiosoitteella ei ole!</ErrorText>
                                            :
                                            status === 'trial_expired' ? <ErrorText>Kokeilujaksosi on päättynyt!</ErrorText>
                                            :
                                            <ErrorText>Käyttäjätili on poistettu käytöstä! <Link href="/" className="text-primary underline">Mitäs nyt?</Link></ErrorText>
                                        }
                                    </div>
                                )
                                :
                                null
                            }
                            
                        </div>
 
                        <div className="flex flex-col gap-2">
                            <Input 
                                data-testid="login-password-input"
                                label="Salasana"
                                description='Tilin salasana.'
                                type="password" 
                                name="password" 
                                placeholder="Kirjoita salasanasi..."
                                required 
                                onChange={updateData}/>
                       
                            {
                                status === 'password_mismatch' ? (
                                    <div className="w-full flex flex-row xs:justify-normal md:justify-end text-sm">
                                        <ErrorText data-testid="password-mismatch-error">Salasana on virheellinen!</ErrorText>
                                    </div>
                                )
                                :
                                null
                            }
                            
                            <div className="w-full flex justify-end gap-2">
                                <span style={{color: 'gray'}}>Unohditko salasanasi? </span><Link data-testid="login-reset-link" href="/login/reset" className="text-orange-400">Klikkaa tähän.</Link>
                            </div>
                        </div>

                        <div className="w-full mt-4 border-t pt-4">
                            <Group direction="row" justify="end" gap={2}>
                                <SecondaryButton 
                                    type="button" 
                                    disabled={loading} 
                                    onClick={cancelHandler}
                                >Peruuta</SecondaryButton>

                                <PrimaryButton 
                                    type="submit"
                                    disabled={loading}
                                    loading={loading}
                                    data-testid="login-btn"
                                >Kirjaudu</PrimaryButton>
                            </Group>
                        </div>
                    </form>
                </ContentCard>
            </Padding>
        </main>
    )
}