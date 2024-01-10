import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { Header } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { PropertyFileListItem } from "kotilogi-app/components/ListItem/ListItem";
import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import db from "kotilogi-app/dbconfig";

export default async function PropertyImagesPage({params}){
    const images = await db('propertyFiles').where({refId: params.property_id});

    return(
        <main>
            <PageWithDataWrapper data={images}>
                <Header>
                    <Heading>Kuvat</Heading>
                </Header>
                <Gallery<Kotilogi.FileType> data={images} itemComponent={PropertyFileListItem}/>
            </PageWithDataWrapper>
        </main>
    );
}