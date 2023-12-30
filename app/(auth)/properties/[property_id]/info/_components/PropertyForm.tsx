'use client';

import Form from "kotilogi-app/components/Form/Form";
import { usePropertyContext } from "../../_util/PropertyContextProvider";
import style from '../page.module.scss';
import { buildingMaterials, buildingTypes, colors, primaryHeatingSystems, roofMaterials, roofTypes, secondaryHeatingSystems, yardOwnershipTypes } from "kotilogi-app/constants";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Button from "kotilogi-app/components/Button/Button";

function Block({children, hidden}: {children: React.ReactNode, hidden?: boolean}){
    return (
        <div className={style.block} hidden={hidden}>
            {children}
        </div>
    )
}

export default function PropertyForm(){
    const {property} = usePropertyContext();
    const [currentData, setCurrentData] = useState(property);
    const [isEdited, setIsEdited] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangeHandler = async (e) => {
        setCurrentData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        });

        if(!isEdited){
            setIsEdited(true);
        }
    }

    const saveData = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await serverUpdateDataById(currentData, property.id, 'properties');
        if(!result){
            toast.error('Tiedon päivitys epäonnistui!');
        }
        else{
            toast.success('Tiedon päivitys onnistui!');
            setIsEdited(false);
        }

        setLoading(false);
    }

    return (

        <Form className={style.propertyForm} onSubmit={saveData}>
            <Block>
                <h2>Yleistiedot</h2>
                <div className={style.formRow}>
                    <Form.Group>
                        <label>Postinumero</label>
                        <input name="zipCode" defaultValue={currentData.zipCode} onChange={onChangeHandler}/>
                    </Form.Group>

                    <Form.Group>
                        <label>Osoite</label>
                        <input name="title" defaultValue={currentData.title} onChange={onChangeHandler}/>
                    </Form.Group>

                    <Form.Group>
                        <label>Rakennusvuosi</label>
                        <input name="buildYear" defaultValue={currentData.buildYear} onChange={onChangeHandler}/>
                    </Form.Group>
                </div>

                <div className={style.formRow}>
                    <Form.Group>
                        <label>Väri</label>
                        <select name="color" onChange={onChangeHandler}>
                            {colors.map((val, index: number) => {
                                return (
                                    <option value={val} key={`color-option-${index}`} selected={currentData.color === val}>{val}</option>
                                )
                            })}
                        </select>
                    </Form.Group>

                    <Form.Group>
                        <label>Rakennusmateriaali</label>
                        <select name="buildingMaterial" onChange={onChangeHandler}>
                            {buildingMaterials.map((val, index: number) => {
                                return (
                                    <option value={val} key={`build-material-option-${index}`} selected={currentData.buildingMaterial === val}>{val}</option>
                                )
                            })}
                        </select>
                    </Form.Group>

                    <Form.Group>
                        <label>Rakennustyyppi</label>
                        <select name="buildingType" onChange={onChangeHandler}>
                            {buildingTypes.map((val, index: number) => {
                                return (
                                    <option value={val} key={`building-type-option-${index}`} selected={currentData.buildingType === val}>{val}</option>
                                )
                            })}
                        </select>
                    </Form.Group>
                </div>
            </Block>
        
            <Block>
                <h2>Katto</h2>
                <div className={style.formRow}>
                    <Form.Group>
                        <label>Materiaali</label>
                        <select name="roofMaterial" onChange={onChangeHandler}>
                            {roofMaterials.map((val, index: number) => {
                                return (
                                    <option value={val} key={`rm-option-${index}`} selected={currentData.roofMaterial === val}>{val}</option>
                                )
                            })}
                        </select>
                    </Form.Group>

                    <Form.Group>
                        <label>Tyyppi</label>
                        <select name="roofType" onChange={onChangeHandler}>
                            {roofTypes.map((val, index: number) => {
                                return (
                                    <option value={val} key={`rt-option-${index}`} selected={currentData.roofType === val}>{val}</option>
                                )
                            })}
                        </select>
                    </Form.Group>
                </div>
            </Block>
            
            <Block>
                <h2>Sisätilat</h2>
                <div className={style.formRow}>
                    <Form.Group>
                        <label>Asuinpinta-ala m<sup>2</sup></label>
                        <input name="livingArea" type="number" defaultValue={currentData.livingArea} onChange={onChangeHandler}/>
                    </Form.Group>

                    <Form.Group>
                        <label>Muu pinta-ala m<sup>2</sup></label>
                        <input name="otherArea" type="number" defaultValue={currentData.otherArea} onChange={onChangeHandler}/>
                    </Form.Group>

                    <Form.Group>
                        <label>
                            {
                                currentData.buildingType === 'Kerrostalo' ? 'Asuinkerros'
                                :
                                'Kerrosten lukumäärä'
                            }
                        </label>
                        <input name="floorCount" type="number" defaultValue={currentData.floorCount} onChange={onChangeHandler}/>
                    </Form.Group>
                </div>

                <div className={style.formRow}>
                    <Form.Group>
                        <label>Huoneiden lukumäärä</label>
                        <input name="roomCount" type="number" defaultValue={currentData.roomCount} onChange={onChangeHandler}/>
                    </Form.Group>

                    <Form.Group>
                        <label>Vessojen lukumäärä</label>
                        <input name="wcCount" type="number" defaultValue={currentData.wcCount} onChange={onChangeHandler}/>
                    </Form.Group>
                </div>
            </Block>
          
            <Block hidden={currentData.buildingType === 'Kerrostalo'}>
                <h2>Tontti</h2>
                <div className={style.formRow}>
                    <Form.Group>
                        <label>Tontin omistus</label>
                        <select name="yardOwnership" onChange={onChangeHandler}>
                            {
                                yardOwnershipTypes.map((val, index: number) => {
                                    return (
                                        <option value={val} key={`yard-ownership-option-${index}`} selected={currentData.yardOwnership === val}>{val}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <label>Pinta-ala m<sup>2</sup></label>
                        <input name="yardArea" type="number" defaultValue={currentData.yardArea} onChange={onChangeHandler}/>
                    </Form.Group>
                </div>
            </Block>
            
            
            <Block>
                <h2>Lämmitysjärjestelmät</h2>
                <div className={style.formRow}>
                    <Form.Group>
                        <label>Ensisijainen</label>
                        <select name="primaryHeatingSystem" onChange={onChangeHandler}>
                            {
                                primaryHeatingSystems.map((val, index: number) => {
                                    return (
                                        <option value={val} key={`phs-option-${index}`} selected={currentData.primaryHeatingSystem === val}>{val}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>

                    <Form.Group>
                        <label>Toissijainen</label>
                        <select name="secondaryHeatingSystem" onChange={onChangeHandler}>
                            {
                                secondaryHeatingSystems.map((val, index: number) => {
                                    return (
                                        <option value={val} key={`shs-option-${index}`} selected={currentData.secondaryHeatingSystem === val}>{val}</option>
                                    )
                                })
                            }
                        </select>
                    </Form.Group>

                    <div className={style.formButtons}>
                        {/**These buttons shall hover fixed in the corner of the screen*/}
                        <Button
                            className="primary"
                            loading={loading}
                            disabled={!isEdited || loading}
                            desktopText="Tallenna Muutokset"
                            type="submit"
                        />
                    </div>
                </div>
            </Block>
            
        </Form>
    );
}