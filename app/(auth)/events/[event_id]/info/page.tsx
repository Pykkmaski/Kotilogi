import { updateDataById } from "kotilogi-app/actions/data/updateData";
import { updatePropertyEvent } from "kotilogi-app/actions/propertyEvent/updatePropertyEvent";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { Input, Textarea } from "kotilogi-app/components/Input/Input";
import { DataPage } from "kotilogi-app/components/Pages/DataPage/DataPage";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import db from "kotilogi-app/dbconfig";
import { Content } from "./page.components";

export default async function EventInfoPage({params}){
    const event = await db('propertyEvents').where({id: params.event_id}).first();
    if(!event) throw new Error('Tapahtuman lataaminen epäonnistui! Kokeile päivittää sivu.');

    return (
        <main>
            <Header>
                <Heading>Tapahtuman tiedot</Heading>
            </Header>
            <Content event={event}/>
        </main>
    )
}