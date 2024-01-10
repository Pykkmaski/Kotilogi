import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { Header } from "kotilogi-app/components/Header/Header";
import { PropertyFileListItem } from "kotilogi-app/components/ListItem/ListItem";
import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import db from "kotilogi-app/dbconfig";

async function getFiles(propertyId){
    const files = await db('propertyFiles').where({refId: propertyId, mimeType: 'application/pdf'});
    return files;
}
export default async function FilesPage({params}){
    const files = await getFiles(params.property_id);

    return(
        <main> 
            <PageWithDataWrapper data={files}>
                <Header>
                    <h3>Tiedostot</h3>
                </Header>
                <Gallery display="list" data={files} itemComponent={PropertyFileListItem}/>
            </PageWithDataWrapper>
        </main>
    );
}