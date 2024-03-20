'use client';

import { useState } from "react";
import { PrimaryButton } from "../Button/PrimaryButton";
import { RoundedBox } from "../RoundedBox/RoundedBox";

function Message({setShowMessage}){

    const acceptCookies = () => {
        document.cookie = 'allow_cookies: true';
        localStorage?.setItem('kotidok-cookies', 'true');
        setShowMessage(false);
    }

    return (
        <RoundedBox>
            <div className="flex flex-col gap-4 items-center">
                <div className="flex w-full justify-between gap-4 sm:items-start md:items-center">
                    <img src="/icons/cookie.png" className="aspect-square sm:w-[30px] md:w-[80px] sm:mt-4 md:mt-0"></img>
                    <span className="text-lg text-slate-500">
                        Käytämme evästeitä. Kaikki evästeet ovat sovelluksen toiminnan kannalta välttämättömiä, eikä niitä käytetä yksityisten tietojen keräämiseen.<br/>
                        Jatkamalla sivuston käyttöä, hyväksyt evästeiden tallennuksen laitteellesi.
                    </span>
                </div>
                

                <div className="flex gap-4 justify-end mt-4 border-t border-slate-200 pt-4 w-full">
                    <div className="w-[100px] [&>*]:w-full">
                        <PrimaryButton onClick={acceptCookies}>
                            <div className="w-full text-center">
                                Selvä
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </RoundedBox>
    );
}

export function CookieNotice(){
    const cookiesAccepted = typeof window !== 'undefined' ? localStorage?.getItem('kotidok-cookies') : false;
    const [showMessage, setShowMessage] = useState(cookiesAccepted && cookiesAccepted === 'true' ? false : true);
    
    return (
        <div className="fixed bottom-11 sm:right-0 md:right-4 shadow-lg sm:w-full md:w-[500px] z-50 animate-slideup-slow flex items-center">
            {showMessage ? <Message setShowMessage={setShowMessage}/> : null}
        </div>
    );
}