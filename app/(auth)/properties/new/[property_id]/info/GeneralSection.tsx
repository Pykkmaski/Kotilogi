import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";


export default function GeneralSection({currentData, onChangeHandler}){
    return (
        <Section title="Yleistiedot">
            <Input label="Osoite" name="title" required={true} defaultValue={currentData.title} onChange={onChangeHandler} type="text"/>
            <Input label="Postinumero" name="zipCode" required={true} defaultValue={currentData.zipCode} onChange={onChangeHandler} type="text"/>
            <Input label="Rakennusvuosi" name="buildYear" defaultValue={currentData.buildYear} onChange={onChangeHandler} type="number"/>
            <Select label="Rakennustyyppi" onChange={onChangeHandler} name="buildingType">
                {
                    buildingTypes.map((val, index: number) => {
                        return (
                            <option value={val} selected={val === currentData.buildingType} key={`option-${index}`}>{val}</option>
                        );
                    })
                }
            </Select>
    
            <Select label="Energialuokka" onChange={onChangeHandler} name="energyClass">
                {
                    energyClasses.map((val, index: number) => {
                        return (
                            <option value={val} selected={val === currentData.energyClass} key={`option-${index}`}>{val}</option>
                        );
                    })
                }
            </Select>

            <Select label="Autotalli" name="hasGarage" onChange={onChangeHandler}>
                <option value={1} selected={currentData.hasGarage == true}>Kyllä</option>
                <option value={0} selected={currentData.hasGarage == false}>Ei</option>
            </Select>
        </Section> 
    );
}