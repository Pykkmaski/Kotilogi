import Form from "kotilogi-app/components/Form";
import style from './input.module.scss';
import { buildingTypes } from "kotilogi-app/constants";

function Block({children, hidden}: {children: React.ReactNode, hidden?: boolean}){
    return (
        <div className={style.block} hidden={hidden}>{children}</div>
    );
}

export default function Page(){
    return (
        <>
            <h1>Tiedot</h1>
            <Form>
                <Block>
                    <h2>Yleistiedot</h2>
                    <input className={style.input} name="zipCode" placeholder="Postinumero..."/>
                    <input className={style.input} name="title" placeholder="Osoite..."/>
                    <select className={style.input} name="buildingType">
                        <option disabled={true} selected={true}>Talotyyppi...</option>
                    </select>
                </Block>
                    
                <Block>
                    <h2>Katto</h2>
                    <select className={style.input} name="roofType">
                        <option disabled={true} selected={true}>Kattotyyppi...</option>
                    </select>
                    <select className={style.input} name="roofMaterial">
                        <option disabled={true} selected={true}>Katon materiaali...</option>
                    </select>
                </Block>

                <Block>
                    <h2>Sisätilat</h2>
                    <input className={style.input} name="livingArea" placeholder="Pinta-ala..." type="number"/>
                    <input className={style.input} name="roomCount" placeholder="Huoneiden lukumäärä..." type="number"/>
                    <input className={style.input} name="floorCount" placeholder="Kerrosten lukumäärä..." type="number"/>
                    <input className={style.input} name="wcCount" placeholder="Vessojen lukumäärä..." type="number"/>
                </Block>
                
            </Form>
            
        </>
    )
}