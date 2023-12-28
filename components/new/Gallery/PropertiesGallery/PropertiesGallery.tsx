"use client";
import AddModal from "./components/AddModal/AddModal";
import {Gallery} from "../GalleryBase/Gallery";
import Card from "../GalleryBase/Components/Body/Components/Card/Card";
import PropertiesMenu from "./components/OverlayMenu/PropertiesMenu";
import Error from "../GalleryBase/Components/Error/Error";
import HouseIcon from '@/assets/house.png';
import Body from "../GalleryBase/Components/Body/Body";
import { CSSProperties } from "react";
import Header from "../GalleryBase/Components/Header/Header";

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

function PropertiesGalleryBody(){
    const style: CSSProperties = {
        display: 'flex',
        flexFlow: 'column',
        width: '100%',
        alignItems: 'center',
    }

    return (
        <div style={style}>
            <p style={{fontSize: '1.1rem'}}>
                Tässä Näet talosi. Jos tarvitset lisää taloja, päivitä pro-tiliin.
            </p>
            <Body itemComponent={ItemComponent} displayStyle="horizontal" errorComponent={<Error
                title="Ei Taloja"
                message="Et ole vielä lisännyt taloja. Aloita painamalla yläreunassa olevaa Lisää Uusi-painiketta."
                icon={HouseIcon}/>
            }/>
        </div>
    )
}

export default async function PropertiesGallery(props: {
    ownerId: string,
}){ 
    return (
        <Gallery
            tableName="properties"
            query={{
                refId: props.ownerId,
            }}
            title="Talot">
                
            <Header title="Talot" AddModal={AddModal}/>
            <PropertiesGalleryBody/>
        </Gallery>
    );
}