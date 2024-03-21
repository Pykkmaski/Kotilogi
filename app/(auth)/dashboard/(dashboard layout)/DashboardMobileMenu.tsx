'use client';

import { LineButton } from "@/components/MenuButton/LineButton";
import { VisibilityProvider } from "@/components/Util/VisibilityProvider/VisibilityProvider";

export function DashboardMobileMenu(){

    return (
        <VisibilityProvider>
            <VisibilityProvider.Target>
                <LineButton/>
            </VisibilityProvider.Target>
        </VisibilityProvider>
    );
}