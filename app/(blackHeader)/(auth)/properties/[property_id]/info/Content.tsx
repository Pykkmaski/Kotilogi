'use client';

import BuildingSection from "./BuildingSection"
import ExteriorSection from "./ExteriorSection"
import GeneralSection from "./GeneralSection"
import InteriorSection from "./InteriorSection"
import RoofSection from "./RoofSection"
import HeatingSection from "./HeatingSection";
import { updateProperty } from "kotilogi-app/actions/experimental/properties";

export function Content({propertyData}: {
    propertyData: Kotilogi.PropertyType
}){

    const update = (data: Kotilogi.ItemType) => updateProperty(propertyData.id, data);
    
    return (
        <>
            <GeneralSection propertyData={propertyData} updateProperty={update}/>
            {propertyData.buildingType !== 'Kerrostalo' ? <ExteriorSection propertyData={propertyData} updateProperty={update}/> : null}
            <BuildingSection propertyData={propertyData} updateProperty={update}/>
            <InteriorSection propertyData={propertyData} updateProperty={update}/>
            <HeatingSection propertyData={propertyData} updateProperty={update}/>
            <RoofSection propertyData={propertyData} updateProperty={update}/>
        </>
    )
}