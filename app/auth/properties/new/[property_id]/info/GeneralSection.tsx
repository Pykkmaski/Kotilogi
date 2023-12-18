import Form from "kotilogi-app/components/Form/Form";
import { buildingTypes, colors, energyClasses } from "kotilogi-app/constants";
import Input from "./_components/Input/Input";

export default function GeneralSection({currentData, onChangeHandler}){
    return (
        <>
            <Form.Group>
                <label>Osoite</label>
                <input name="title" defaultValue={currentData.title} onChange={onChangeHandler} type="text"/>
            </Form.Group>
            
            <Form.Group>
                <label>Postinumero</label>
                <input name="zipCode" defaultValue={currentData.zipCode} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Rakennusvuosi</label>
                <input name="buildYear" defaultValue={currentData.buildYear} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
                <label>Rakennustyyppi</label>
                <select onChange={onChangeHandler} name="buildingType">
                    {
                        buildingTypes.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.buildingType} key={`option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Energialuokka</label>
                <select onChange={onChangeHandler} name="energyClass">
                    {
                        energyClasses.map((val, index: number) => {
                            return (
                                <option value={val} selected={val === currentData.energyClass} key={`option-${index}`}>{val}</option>
                            );
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Autotalli</label>
                <select name="hasGarage" onChange={onChangeHandler}>
                    <option value={1} selected={currentData.hasGarage == true}>Kyllä</option>
                    <option value={0} selected={currentData.hasGarage == false}>Ei</option>
                </select>
            </Form.Group>
        </> 
    );
}