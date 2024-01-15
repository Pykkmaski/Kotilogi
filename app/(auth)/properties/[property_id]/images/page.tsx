import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { Group } from "kotilogi-app/components/Group/Group";
import { Header } from "kotilogi-app/components/Header/Header";
import { ControlsWithAddAndDelete } from "kotilogi-app/components/HeaderControls/ControlsWithAddAndDelete";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { ImageListItem, PropertyFileListItem, PropertyImageListItem } from "kotilogi-app/components/ListItem/ListItem";
import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import db from "kotilogi-app/dbconfig";
import { Controls } from "./page.components";
import { DataPage } from "kotilogi-app/components/Pages/DataPage/DataPage";

export default async function PropertyImagesPage({params}){
    const images = await db('propertyFiles').where({refId: params.property_id, mimeType: 'image/jpeg'});

    return(
        <DataPage data={images}>
            <Header>
                <h3>Kuvat</h3>
                <Controls/>
            </Header>
            <Gallery<Kotilogi.FileType> display="card" data={images} itemComponent={PropertyImageListItem}/> 
        </DataPage>
    );
}