'use client';
import {Header as HeaderComponent} from '@/components/Header/Header';
import { Group } from 'kotilogi-app/components/Group/Group';
import { ControlsWithAddAndDelete } from 'kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete';
import { Heading } from 'kotilogi-app/components/Heading/Heading';
import { AddFilesModal } from 'kotilogi-app/components/Modals/AddFilesModal';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';

export function Header(){
    const {state} = usePageWithDataContext();

    return (
        <HeaderComponent>
            <Heading>Kuvat</Heading>
            <Group direction="horizontal" gap="0.5rem">
                
            </Group>
        </HeaderComponent>
    )
}