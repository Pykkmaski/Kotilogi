"use client";
import AddModal from "./components/AddModal/AddModal";
import GalleryBase from "../GalleryBase/GalleryBase";
import Card from "../GalleryBase/Components/Body/Components/Card/Card";
import PropertiesMenu from "./components/OverlayMenu/PropertiesMenu";
import Error from "../GalleryBase/Components/Error/Error";
import HouseIcon from '@/assets/house.png';
import Body from "../GalleryBase/Components/Body/Body";

function ItemComponent(props: {
    item: any
}){
    return (
        <Card 
            item={props.item} 
            OverlayMenu={PropertiesMenu}
        />
    );
}

export default async function PropertiesGallery(props: {
    ownerId: string,
}){ 
    return (
        <GalleryBase
            tableName="properties"
            contentType="object"
            query={{
                refId: props.ownerId,
            }}
            title="Talot"
            AddModal={AddModal}>

                <Body itemComponent={ItemComponent} displayStyle="horizontal" errorComponent={<Error
                    title="Ei Taloja"
                    message="Et ole vielä lisännyt taloja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."
                    icon={HouseIcon}/>
                    }/>
        </GalleryBase>
    );
}