import Form from "kotilogi-app/components/Form";
import style from './style.module.scss';
import Page from "kotilogi-app/components/Page/Page";
import Button from "kotilogi-app/components/Button/Button";
import TransferForm from "./transferForm";
export default async function TransferPage(){


    return (
        <div className={style.contentContainer}>
               
                <TransferForm/>
                <div>
                    <h1>Siirrä Talon Omistajuus</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis tempore quas ut libero non, cupiditate quos aliquid labore totam cum amet voluptatibus illum dolorem alias consequuntur ex minima hic assumenda.
                        Sequi amet ipsam nisi, corporis voluptatibus, similique debitis soluta quos quae dolore porro sit accusantium, non excepturi. Nesciunt cupiditate voluptatum consequuntur quasi perspiciatis, inventore, maxime excepturi eius numquam nulla delectus!
                        Natus velit quae tempora excepturi neque hic corrupti, magni aspernatur quaerat facere, accusamus ducimus. Dolores dolor, laudantium nam minima officiis laboriosam, provident nemo deserunt, modi quae nisi illum nesciunt doloribus.
                    </p>
                </div>
        </div>
    )
}