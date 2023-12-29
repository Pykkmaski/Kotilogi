import Form from "kotilogi-app/components/Form/Form";
import { Input } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";

export default function InteriorSection({currentData, onChangeHandler}){
    return (
        <Section title="Sisätilat">
      
                <Input label="Pinta-ala(m2)" name="livingArea" defaultValue={currentData.livingArea} onChange={onChangeHandler}/>
                <Input label={currentData.buildingType === 'Kerrostalo' ? 'Kerrosnumero' : 'Kerrosten Lukumäärä'} name="floorCount" defaultValue={currentData.floorCount} onChange={onChangeHandler}/>
                <Input label="Huoneiden lukumäärä" type="number" name="roomCount" defaultValue={currentData.roomCount} onChange={onChangeHandler}/>
                <Input label="Vessojen lukumäärä" type="number" name="wcCount" defaultValue={currentData.wcCount} onChange={onChangeHandler}/>
        </Section> 
    );
}