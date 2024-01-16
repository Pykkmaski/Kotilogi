'use client';

import { updatePropertyEvent } from "kotilogi-app/actions/propertyEvent/updatePropertyEvent";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { Input, Textarea } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

type ContentProps = {
    event: Kotilogi.EventType,
}

export function Content({event}: ContentProps){
    const isConsolidated = Date.now() >= parseInt(event.consolidationTime);
    const updateEvent = (data: object) => updatePropertyEvent(event.id, data);

    return (
        <>
            <EditCard title="Tiedot">
                <SingleInputForm editingDisabled={isConsolidated} submitMethod={updateEvent} inputComponent={Input} initialInputProps={{
                    label: 'Otsikko',
                    name: 'title',
                    description: 'Tapahtuman otsikko.',
                    placeholder: 'Kirjoita tapahtuman otsikko...',
                    defaultValue: event.title,
                    autoComplete: 'off',
                }}/>

                <SingleInputForm editingDisabled={isConsolidated} submitMethod={updateEvent} inputComponent={Textarea} initialInputProps={{
                    label: 'Kuvaus',
                    name: 'description',
                    description: 'Tapahtuman kuvaus.',
                    placeholder: 'Kirjoita tapahtuman kuvaus...',
                    defaultValue: event.description,
                    spellCheck: false,
                }}/>

                <SingleInputForm editingDisabled={isConsolidated} submitMethod={updateEvent} inputComponent={Input} initialInputProps={{
                    label: 'Päiväys',
                    name: 'time',
                    description: 'Tapahtuman päiväys.',
                    type: 'date',
                    defaultValue: new Date(event.time).toLocaleDateString('fi-FI'),
                }}/>
            </EditCard>
        </>
    )
}