import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import { Section } from "./Section";
import { EditCard } from "kotilogi-app/components/EditCard/EditCard";
import { SingleInputForm } from "kotilogi-app/components/SingleInputForm/SingleInputForm";
import { useInfoPageContext } from "./page";


export default function GeneralSection({currentData, onChangeHandler}){

    const {onUpdate} = useInfoPageContext();
    
    return (
        <EditCard title="Yleistiedot">
            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                    <Input 
                        label="Osoite" 
                        description="Talon katuosoite."
                        autoComplete="off"
                        name="title" required={true} defaultValue={currentData.title} onChange={onChangeHandler} type="text"/>
                }/>
        
            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                <Input 
                    label="Postinumero" 
                    description="Talon viisinumeroinen postinumero."
                    maxLength={5}
                    minLength={5}
                    name="zipCode" required={true} defaultValue={currentData.zipCode} onChange={onChangeHandler} type="text"/>
                }/>
            
            
            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                    <Input 
                        label="Rakennusvuosi" 
                        description="Vuosi jolloin talo valmistui."
                        name="buildYear" defaultValue={currentData.buildYear} onChange={onChangeHandler} type="number"/>
                }/>
            
            <SingleInputForm
                submitMethod={onUpdate}
                inputElement={
                    <Select 
                        label="Rakennustyyppi" 
                        description="Esimerkiksi omakotitalo tai kerrostalo."
                        onChange={onChangeHandler} name="buildingType">
                        {
                            buildingTypes.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.buildingType} key={`option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
            

            <SingleInputForm
                submitMethod={onUpdate}
                inputElement={
                    <Select 
                        label="Energialuokka" 
                        description="Talon energiatehokkuus."
                        onChange={onChangeHandler} name="energyClass">
                        {
                            energyClasses.map((val, index: number) => {
                                return (
                                    <option value={val} selected={val === currentData.energyClass} key={`option-${index}`}>{val}</option>
                                );
                            })
                        }
                    </Select>
                }/>
            
            <SingleInputForm 
                submitMethod={onUpdate}
                inputElement={
                    <Select 
                        label="Autotalli" 
                        description="Onko talolla autotallia?"
                        name="hasGarage" onChange={onChangeHandler}>
                        <option value={1} selected={currentData.hasGarage == true}>Kyllä</option>
                        <option value={0} selected={currentData.hasGarage == false}>Ei</option>
                    </Select>
                }/>
        </EditCard> 
    );
}