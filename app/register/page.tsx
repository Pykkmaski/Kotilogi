"use client";

import styles from './page.module.scss';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';
import { RegisterForm } from './RegisterForm';

/**This component is responsible for displaying the contents of the register page. */
export default function RegisterPage(){
    return (
        <div className={styles.container}>
            <Gradient direction={'bottom'}/>
            <RegisterForm/>
        </div>
    )
}