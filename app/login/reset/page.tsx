import Form from "kotilogi-app/components/Form";
import ResetForm from "./ResetForm";
import styles from './page.module.scss';

export default function ResetPage(){
    return (
        <main className={styles.main}>
            <h1>Nollaa Salasanasi</h1>
            <ResetForm/>
        </main>
    );
}