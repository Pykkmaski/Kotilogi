'use client';

import Button from "@/components/Button/Button";
import Spinner from "@/components/Spinner/Spinner";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const Heading = ({children}) => {
    return <h1 className="text-4xl font-semibold text-slate-500 mb-4">{children}</h1>
}

const Paragraph = ({children}) => {
    return (
        <p className="text-lg">{children}</p>
    );
}

const FailureHeading = () => <Heading>Maksu Epäonnistui!</Heading>
const BackToCheckout = () => (
    <div className="mt-4">
        <Link href="/checkout">
            <Button variant="primary">
                <span className="mx-4">Takaisin tilaamiseen</span>
            </Button>
        </Link>
    </div>
)

export default function PaymentResult({returnCode, paymentStatusCode}){
    const [signingOut, setSigningOut] = useState(false);
    
    console.log(paymentStatusCode);

    const getContent = () => {
        if(returnCode === 0){
            //Sucessful payment
            return (
                <>
                    <Heading>Maksu Onnistui</Heading>
                    <Paragraph>
                        Kiitos tilauksestasi!
                        Sinun on kirjauduttava ulos, että tilauksesi tulee voimaan.
                    </Paragraph>

                    <div className="mt-4">
                        <Button variant="primary" disabled={signingOut} loading={signingOut} onClick={() => {
                            setSigningOut(true);
                            signOut({
                            callbackUrl: '/login',
                            redirect: true,
                        })}}>
                            <span className="mx-4">
                                Kirjaudu ulos nyt
                            </span>
                        </Button>
                    </div>
                </>
            );
        }
        else{
            if(paymentStatusCode === null){
                return ( 
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Maksua tehdessä tapahtui tuntematon virhe.
                        </Paragraph>
                        <BackToCheckout/>
                    </>
               );
            }
            else if(paymentStatusCode === '04'){
                //Stolen card.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Käyttämäsi kortti on ilmoitettu varastetuksi, eikä sitä voi veloittaa.
                        </Paragraph>
                    </>
                )
            }
            else if(paymentStatusCode === '05'){
                //General decline. The card holder should contact the issuer to find out why the payment failed.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Maksu hylättiin. Ota yhteyttä kortin laatijaan.
                        </Paragraph>
                    </>
                )
            }
            else if(paymentStatusCode === '51'){
                //Insufficient funds. The card holder should verify that there is balance on the account and the online payments are actived.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Kortilla ei ole tarpeeksi katetta.
                        </Paragraph>
                    </>
                )
            }
            else if(paymentStatusCode === '54'){
                //Expired card.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Käyttämäsi kortti on vanhentunut.
                        </Paragraph>
                    </>
                )
            }
            else if(paymentStatusCode === '61'){
                //Withdrawal amount limit exceeded.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Maksu ylittää kortin nostorajan.
                        </Paragraph>
                    </>
                )
            }
            else if(paymentStatusCode === '62'){
                //Restricted card. The card holder should verify that the online payments are actived.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Kortin sallittuja maksuja on rajoitettu. Tarkista että kortilla voi tehdä verkkomaksuja.
                        </Paragraph>
                    </>
                )
            }
            else if(paymentStatusCode === '1000'){
                //Timeout communicating with the acquirer. The payment should be tried again later.
                return (
                    <>
                        <FailureHeading/>
                        <Paragraph>
                            Maksu aikakatkaistu. Yritä myöhemmin uudelleen.
                        </Paragraph>
                        <BackToCheckout/>
                    </>
                );
            }
        }
    }
    return (
        <main className="flex flex-col w-full flex-1 items-center justify-center">
            {getContent()}
        </main>
    )
}