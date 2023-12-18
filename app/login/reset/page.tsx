import ResetForm from "./ResetForm";
import style from '../page.module.scss';
import Gradient from "kotilogi-app/components/Gradient/Gradient";

export default function ResetPage(){
    return (
        <main className={style.container}>
            <Gradient direction="bottom"/>
            <ResetForm/>
        </main>
    );
}