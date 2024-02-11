import ResetForm from "../../../components/LoginPage/ResetPage/ResetForm";
import { Padding } from "kotilogi-app/components/Util/Padding";

export default function ResetPage(){
    return (
        <main className='flex flex-col justify-center md:items-center sm:items-[none] flex-1'>
            <Padding>
                <ResetForm/>
            </Padding>    
        </main>
    );
}