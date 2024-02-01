import ResetForm from "./ResetForm";
import style from '../page.module.scss';
import { Padding } from "kotilogi-app/components/Util/Padding";

export default function ResetPage(){
    return (
        <main className='flex flex-col justify-center items-center flex-1'>
            <Padding>
                <ResetForm/>
            </Padding>    
        </main>
    );
}