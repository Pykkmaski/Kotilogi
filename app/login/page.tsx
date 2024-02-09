"use client";

import {signIn} from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState} from 'react';
import {SecondaryButton} from 'kotilogi-app/components/Button/SecondaryButton';
import {PrimaryButton} from 'kotilogi-app/components/Button/PrimaryButton';
import { Input } from 'kotilogi-app/components/Input/Input';
import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { Group } from 'kotilogi-app/components/Group';
import Link from 'next/link';
import { useInputData } from 'kotilogi-app/components/Modals/BaseAddModal.hooks';
import { Padding } from 'kotilogi-app/components/Util/Padding';
import { ErrorText } from '@/components/Util/Text';
import { useLogin } from './useLogin';

export default function LoginPage(){
    const router = useRouter();
    const {updateData} = useInputData({});
    const {loginHandler, status} = useLogin();

    const cancelHandler = () => {
        router.push('/');
    }

    const loading = status === 'loading';

    return (
        <main className="flex flex-col justify-center items-center flex-1">
            <Padding>
                <ContentCard title="Kirjaudu Sisään">
                    <form onSubmit={loginHandler}>
                        <Group gap={4} direction="col">
                            <Group direction='col' align="end" gap={2}>
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

                                {status === 'invalid_user' ? <ErrorText data-testid="invalid-user-error">Käyttäjää annetulla sähköpostiosoitteella ei ole!</ErrorText> : null}
                            </Group>

                            <div className="w-full">
                                <Group direction="col" align="end" gap={2}>
                                    <Input 
                                        data-testid="login-password-input"
                                        label="Salasana"
                                        description='Tilin salasana.'
                                        type="password" 
                                        name="password" 
                                        placeholder="Kirjoita salasanasi..."
                                        required 
                                        onChange={updateData}/>

                                    {status === 'password_mismatch' ? <ErrorText data-testid="password-mismatch-error">Salasana on virheellinen!</ErrorText> : null}

                                    <div className="w-full flex justify-end gap-2">
                                        <span style={{color: 'gray'}}>Unohditko salasanasi? </span><Link data-testid="login-reset-link" href="/login/reset" className="text-orange-400">Klikkaa tähän.</Link>
                                    </div>
                                </Group>
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
                        </Group>
                    </form>
                </ContentCard>
            </Padding>
        </main>
    )
}