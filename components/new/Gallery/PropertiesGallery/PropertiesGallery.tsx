"use client";
import AddModal from "./components/AddModal/AddModal";
import GalleryBase from "../GalleryBase/GalleryBase";

type PropertiesGalleryProps = {
    ownerId: string,
}

export default async function PropertiesGallery(props: PropertiesGalleryProps){ 
    return (
        <GalleryBase
            tableName="properties"
            contentType="object"
            query={{
                refId: props.ownerId,
            }}
            title="Talot"
            AddModal={AddModal}
        />
    );
}