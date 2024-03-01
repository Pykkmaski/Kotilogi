"use client";

import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { Input, Select } from 'kotilogi-app/components/Input/Input';
import { Group } from 'kotilogi-app/components/Group';
import {SecondaryButton} from 'kotilogi-app/components/Button/SecondaryButton';
import {PrimaryButton} from 'kotilogi-app/components/Button/PrimaryButton';
import { Padding } from 'kotilogi-app/components/Util/Padding';
import Link from 'next/link';
import { ErrorText } from 'kotilogi-app/components/Util/Text';
import { MIN_PASSWORD_LENGTH, Prices, serviceName } from 'kotilogi-app/constants';
import { getBasePrice, getFullPrice } from 'kotilogi-app/utils/getFullPrice';
import { useRegister } from './useRegister';

function IncludesVATNotice(){
    return <span>(Sis. ALV {Prices.TAX * 100}%)</span>
};

function RegularPlanInfo(){
    return (
        <span className="text-slate-500">Perustilin vuosihinta on <span className="text-orange-500">{getBasePrice('regular')}€</span></span>
    );
}

function ProPlanInfo(){
    return (
        <span className="text-slate-500">Pro-tilin vuosihinta on <span className="text-orange-500">{getBasePrice('pro')}€</span></span>
    );
}

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage(){
    const {status, registerHandler, data, updateData} = useRegister();
    const loading = status === 'loading';
   
    return (
        <main className="flex flex-col flex-1 justify-center xs:items-[none] md:items-center">
            <Padding>
                <ContentCard title={'Rekisteröidy'}>
                    <form onSubmit={registerHandler} data-testid="register-form" className="flex flex-col md:gap-8 xs:gap-4 xs:w-full">
                        <div className="flex flex-col gap-2">
                            <Input data-testid="register-email-input" label="Sähköpostiosoite" description="Anna sähköpostiosoitteesi." onChange={updateData} required
                                placeholder="Kirjoita sähköpostiosoite..." type="email" name="email"/>

                            {
                                status === 'user_exists' ? (
                                    <div className="w-full flex flex-row xs:justify-normal md:justify-end text-sm">
                                        <ErrorText>Tili annetulla osoitteella on jo olemassa!</ErrorText>
                                    </div>
                                )
                                :
                                null
                            }
                           
                        </div>
                    
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col md:gap-8 xs:gap-4">
                                <Input data-testid="register-password1-input" label="Salasana" description="Anna tilille salasana." type="password" onChange={updateData} required
                                    placeholder="Kirjoita salasana..." autoComplete='new-password' name="password" minLength={MIN_PASSWORD_LENGTH}/>

                                <Input data-testid="register-password2-input" label="Vahvista salasana" description="Kirjoita salasana uudelleen." type="password" required
                                    placeholder='Kirjoita salasana uudelleen...' autoComplete='new-password' name="password2"/>
                            </div>
                       
                            {/**Align the error to the right if on a bigger than mobile device */}
                            {
                                status === 'password_mismatch' ? (
                                    <div className="w-full flex xs:justify-normal md:justify-end text-sm">
                                        <ErrorText>Salasanat eivät täsmää</ErrorText>
                                    </div>
                                )
                                :
                                null
                            }
                        </div>
                        
                        <div className="w-full items-end">
                            <div className="flex flex-col gap-2">
                                <Select 
                                    name="plan" 
                                    label="Tilaustyyppi" 
                                    description="Valitse tilauksesi tyyppi." 
                                    onChange={updateData} 
                                    required> 

                                    <Select.Option value="regular">Perus</Select.Option>
                                    <Select.Option value="pro">Pro</Select.Option>
                                </Select>
                                
                                <div className="w-full flex xs:justify-normal md:justify-end">
                                    {
                                        data.plan === 'regular' ? <RegularPlanInfo/> : <ProPlanInfo/>
                                    }
                                </div>
                            </div>
                        </div>
                    
                        <div className="w-full">
                            <Group direction="row" justify='between' align="center">
                                <span>Olen lukenut <span data-testid="service-name">{serviceName}</span>:n <Link data-testid="register-tos-link" href="/tos" target="_blank" className="text-orange-500">käyttöehdot</Link>:</span>
                                <input data-testid="register-tos-checkbox" className="aspect-square w-[20px]" type="checkbox" required />
                            </Group>
                        </div>

                        <div className="w-full mt-4 border-t-[1px] pt-[1rem]">
                            <Group direction="row" justify='end' gap={2}>
                                <Link href="/" data-testid="register-cancel-btn">
                                    <SecondaryButton disabled={loading}>Peruuta</SecondaryButton>
                                </Link>

                                <PrimaryButton 
                                    type="submit"
                                    title="Rekisteröidy kotilokin käyttäjäksi" 
                                    data-testid="register-submit-btn" 
                                    disabled={loading} 
                                    loading={loading}>Rekisteröidy</PrimaryButton>
                            </Group>
                        </div>
                    </form>
                </ContentCard>
            </Padding>
        </main>
    )
}