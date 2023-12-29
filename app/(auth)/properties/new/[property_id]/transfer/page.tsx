import { testAction } from "kotilogi-app/actions/testAction";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import Form from "kotilogi-app/components/Form/Form";
import db from "kotilogi-app/dbconfig"
import { PropertyTransferForm } from "./PropertyTransferForm";

export default async function TransferPage({params}){
    const property = await db('properties').where({id: params.property_id}).first();
    if(!property) throw new Error('Property failed to load!');

    return (
        <>
            <h2 style={{marginBottom: '1rem'}}>Omistajuus</h2>
            <PropertyTransferForm property={property}/>
        </>
    )
}