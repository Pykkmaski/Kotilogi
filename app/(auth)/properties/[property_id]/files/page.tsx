import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { Header } from "kotilogi-app/components/Header/Header";
import { FileListItem } from "kotilogi-app/components/ListItem/ListItem";
import db from "kotilogi-app/dbconfig";

async function getFiles(propertyId){
    const files = await db('propertyFiles').where({refId: propertyId, mimeType: 'application/pdf'});
    return files;
}
export default async function FilesPage({params}){
    const files = await getFiles(params.property_id);

    return(
        <main>  
            <Header>
                <h3>Tiedostot</h3>
            </Header>

            <Gallery data={files} itemComponent={FileListItem}/>
        </main>
    );
}