import Form from "kotilogi-app/components/Form/Form";
import { Input, Select } from "kotilogi-app/components/Input/Input";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";


export default function GeneralSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <Input label="Osoite" name="title" defaultValue={currentData.title} onChange={onChangeHandler} type="text"/>
            </Form.Group>
            
            <Form.Group>
                <Input label="Postinumero" name="zipCode" defaultValue={currentData.zipCode} onChange={onChangeHandler} type="text"/>
            </Form.Group>

            <Form.Group>
                <Input label="Rakennusvuosi" name="buildYear" defaultValue={currentData.buildYear} onChange={onChangeHandler} type="number"/>
            </Form.Group>

            <Form.Group>
                <Select label="Rakennustyyppi" onChange={onChangeHandler} name="buildingType">
                    {
                        buildingTypes.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.buildingType} key={`option-${index}`}>{val}</option>
                            );
                        })
                    }
                </Select>
            </Form.Group>

            <Form.Group>
                <Select label="Energialuokka" onChange={onChangeHandler} name="energyClass">
                    {
                        energyClasses.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.energyClass} key={`option-${index}`}>{val}</option>
                            );
                        })
                    }
                </Select>
            </Form.Group>

            <Form.Group>
                <Select label="Autotalli" name="hasGarage" onChange={onChangeHandler}>
                    <option value={1} selected={currentData.hasGarage == true}>Kyllä</option>
                    <option value={0} selected={currentData.hasGarage == false}>Ei</option>
                </Select>
            </Form.Group>
        </> 
    );
}