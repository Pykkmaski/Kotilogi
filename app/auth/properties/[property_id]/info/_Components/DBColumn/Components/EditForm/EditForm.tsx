
import Form from "kotilogi-app/components/Form";
import style from './style.module.scss';
import FormContent from "./FormContent";

type Props = {
    property: Kotilogi.PropertyType,
}
export default async function EditForm(props: Props){
    function getTotalArea(a: number | undefined | string, b: number | undefined | string){
        if(typeof a === 'undefined' || typeof b === 'undefined'){
            return undefined;
        }

        var param1: number, param2: number;
        param1 = typeof a === 'string' ? parseFloat(a) : a;
        param2 = typeof b === 'string' ? parseFloat(b) : b;

        return param1 + param2;
    }
    
    return (
        <Form className={style.editForm}>
            <FormContent property={props.property}/>
        </Form>
    )
}