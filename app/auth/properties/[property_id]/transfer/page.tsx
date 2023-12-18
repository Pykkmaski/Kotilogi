import Form from "kotilogi-app/components/Form/Form";
import style from './style.module.scss';
import Page from "kotilogi-app/components/Page/Page";
import Button from "kotilogi-app/components/Button/Button";
import TransferForm from "./TransferForm";
import { serverGetData } from "kotilogi-app/actions/serverGetData";

export default async function TransferPage({params}){
    const property = await serverGetData('properties', {id: params.property_id}, true) as Kotilogi.PropertyType | null;
    if(!property) throw new Error('Loading of property failed!');

    return (
        <div className={style.contentContainer}>
               
                <TransferForm/>
                <div>
                    <h1>Siirrä Talon Omistajuus</h1>
                    <p>
                        Tämä lomake luo varmenteen, jonka avulla vastaanottavan sähköpostiosoitteen omistaja voi siirtää talon <br/> 
                        <strong>{property.title}</strong> omistajuuden itselleen. Hyväksyttyä talon siirtoa ei voi kumota!
                    </p>
                </div>
        </div>
    )
}