'use client';

import { updateEvent } from "kotilogi-app/actions/experimental/events";
import { ContentCard } from "kotilogi-app/components/RoundedBox/RoundedBox";
import { Input, Textarea } from "kotilogi-app/components/Input/Input";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";

type ContentProps = {
    event: Kotilogi.EventType,
}

export function Content({event}: ContentProps){
    const isConsolidated = Date.now() >= parseInt(event.consolidationTime);
    const update = (data: TODO) => {
        return updateEvent(event.id, data as TODO);
    }

    return (
        <>
            <ContentCard title="Tiedot">
                <SingleInputForm editingDisabled={isConsolidated} submitMethod={update} inputComponent={Input} initialInputProps={{
                    label: 'Otsikko',
                    name: 'title',
                    description: 'Tapahtuman otsikko.',
                    placeholder: 'Kirjoita tapahtuman otsikko...',
                    defaultValue: event.title,
                    autoComplete: 'off',
                }}/>

                <SingleInputForm editingDisabled={isConsolidated} submitMethod={update} inputComponent={Textarea} initialInputProps={{
                    label: 'Kuvaus',
                    name: 'description',
                    description: 'Tapahtuman kuvaus.',
                    placeholder: 'Kirjoita tapahtuman kuvaus...',
                    defaultValue: event.description,
                    spellCheck: false,
                }}/>

                <SingleInputForm editingDisabled={isConsolidated} submitMethod={update} inputComponent={Input} initialInputProps={{
                    label: 'Päiväys',
                    name: 'time',
                    description: 'Tapahtuman päiväys.',
                    type: 'date',
                    defaultValue: event.time,
                }}/>
            </ContentCard>
        </>
    )
}