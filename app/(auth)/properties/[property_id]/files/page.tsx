import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { Header } from "kotilogi-app/components/Header/Header";
import { PropertyFileListItem } from "kotilogi-app/components/ListItem/ListItem";
import db from "kotilogi-app/dbconfig";
import { Controls } from "./page.component";
import { DataPage } from "kotilogi-app/components/Pages/DataPage/DataPage";

async function getFiles(propertyId){
    const files = await db('propertyFiles').where({refId: propertyId, mimeType: 'application/pdf'});
    return files;
}
export default async function FilesPage({params}){
    const files = await getFiles(params.property_id);

    return(
        <DataPage data={files}>
            <Header>
                <h3>Tiedostot</h3>
                <Controls/>
            </Header>
            <Gallery display="list" data={files} itemComponent={PropertyFileListItem}/>
        </DataPage>
    );
}