import db from "kotilogi-app/dbconfig"
import PropertiesGallery from "./PropertiesGallery";

export default async function PropertiesPage({params}){
    const properties = await db('properties').limit(10);

    return (
        <PropertiesGallery properties={properties}/>
    );
}