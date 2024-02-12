'use client';

import { useState } from "react";
import { PrimaryButton } from "../Button/PrimaryButton";
import { RoundedBox } from "../RoundedBox/RoundedBox";

function Message({setShowMessage}){

    const acceptCookies = () => {
        sessionStorage.setItem('cookies', 'true');
        setShowMessage(false);
    }

    return (
        <RoundedBox>
            <div className="flex flex-col gap-4 items-center">
                <div className="flex w-full justify-between gap-4 items-center">
                    <img src="/icons/cookie.png" width="80px" height="80px"></img>
                    <span className="text-lg text-slate-500">
                        Käytämme evästeitä. Jatkamalla sivuston käyttöä, hyväksyt evästeiden tallennuksen laitteellesi.
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
    const cookiesAccepted = sessionStorage.getItem('cookies');
    const [showMessage, setShowMessage] = useState(cookiesAccepted && cookiesAccepted === 'true' ? false : true);
    
    return (
        <div className="fixed bottom-11 right-4 shadow-lg w-[500px] z-50 animate-slideup-slow">
            {showMessage ? <Message setShowMessage={setShowMessage}/> : null}
        </div>
    );
}