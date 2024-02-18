'use client';

import { PrimaryButton } from "../Button/PrimaryButton";
import { DateRangeSelector } from "../DateRangeSelector/DateRangeSelector";
import { VisibilityProvider } from "../Util/VisibilityProvider/VisibilityProvider";

export function SelectTimeSpanButton({children}){
    return (
        <VisibilityProvider>
            <div className="flex flex-col relative gap-4">
                <VisibilityProvider.Trigger>
                    <PrimaryButton>Valitse Aikaväli</PrimaryButton>
                </VisibilityProvider.Trigger>

                <VisibilityProvider.Target>
                    {children}
                </VisibilityProvider.Target>
            </div>
        </VisibilityProvider>
    );
}