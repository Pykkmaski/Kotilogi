"use client";

import Form from "kotilogi-app/components/Form"
import styles from './page.module.scss';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";

export default function InfoForm({property}){
    const [currentData, setCurrentData] = useState(property);
    const initialRender = useRef(true);

    const updateData = async (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name] : e.target.value,
        });
    }

    useEffect(() => {
        //Don't run on first render
        if(initialRender.current === true){
            initialRender.current = false;
            return;
        }

        //Limit the frequency of backend updates.
        const timeoutId = setTimeout(async () => {
            try{
                await serverUpdateDataById(currentData, property.id, 'properties');
            }
            catch(err){
                toast.error('Talon päivitys epäonnistui!');
            }
           
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [currentData]);

    function getTotalArea(a: number | undefined | string, b: number | undefined | string){
        if(typeof a === 'undefined' || typeof b === 'undefined'){
            return undefined;
        }

        var param1: number, param2: number;
        param1 = typeof a === 'string' ? parseFloat(a) : a;
        param2 = typeof b === 'string' ? parseFloat(b) : b;

        return param1 + param2;
    }

    return (
        <Form className={styles.form}>
            <h2 className={styles.title}>Yleistiedot</h2>
            <Form.Group>
                <label>Omistaja</label>
                <span className={styles.ownerText}>{currentData?.refId}</span>
            </Form.Group>

            <Form.Group>
                <label>Postinumero</label>
                <span className={styles.ownerText}>{currentData?.zipCode}</span>
            </Form.Group>
            
            <Form.Group>
                <label>Osoite</label>
                <input name="title" onChange={updateData} defaultValue={currentData?.title}></input>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" onChange={updateData} defaultValue={currentData?.description} spellCheck={false}></textarea>
            </Form.Group>

            <Form.Group hidden={currentData?.buildingType === 'Kerrostalo'}>
                <label>Tontin omistus</label>
                <select name="yardOwnership" onChange={updateData}>
                    {
                        [
                            'Oma',
                            'Vuokra',
                            'Ei Mitään'
                        ]
                        .map((item: string, index: number) => {
                            return (
                                <option value={item} selected={currentData?.yardOwnership === item}>{item}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Rakennusvuosi</label>
                <input type="number" step="1" min="1" name="buildYear" onChange={updateData} defaultValue={currentData?.buildYear}></input>
            </Form.Group>

            <Form.Group>
                <label>Asuntotyyppi</label>
                <select name="buildingType" onChange={updateData}>
                    {
                        ([
                            'Kerrostalo',
                            'Omakotitalo',
                            'Rivitalo',
                            'Luhtitalo',
                            'Erillistalo',
                            'Paritalo',
                            'Puutalo-osake',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={'property-type-option-' + index} selected={currentData?.buildingType === item}>{item}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Rakennusmateriaali</label>
                <select name="buildingMaterial" onChange={updateData}>
                    {
                        ([
                            'Betoni',
                            'Tiili',
                            'Puu',
                            'Hirsi',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={`building-material-${index}`} selected={currentData?.buildingMaterial == item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Väri</label>
                <select name="color" onChange={updateData}>
                    {
                        ([
                            'Valkoinen',
                            'Keltainen',
                            'Sininen',
                            'Punainen',
                            'Ruskea',
                            'Musta',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={`color-option-${item}`} selected={currentData?.color === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>{currentData?.buildingType === 'Kerrostalo' ? 'Kerros' : 'Kerrosten lukumäärä'}</label>
                <input type="number" step="1" min="1" name="floorCount" onChange={updateData} defaultValue={currentData?.floorCount}></input>
            </Form.Group>

            <Form.Group>
                <label>Huoneiden lukumäärä</label>
                <input type="number" step="1" min="1" name="roomCount" onChange={updateData} defaultValue={currentData?.roomCount}></input>
            </Form.Group>

            <Form.Group>
                <label>Vessojen lukumäärä</label>
                <input type="number" step="1" min="1" name="wcCount" onChange={updateData} defaultValue={currentData?.wcCount}></input>
            </Form.Group>

            <Form.Group>
                <label>Energialuokka</label>
                <select name="energyClass" onChange={updateData}>
                    {
                        (['A', 'B', 'C', 'D', 'E', 'F', 'Ei Määritelty']).map((item, index: number) => {
                            return (
                                <option value={item} key={index} selected={currentData?.energyClass === item}>{item || 'Ei Määritelty'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <h2 className={styles.title}>Lämmitysjärjestelmät</h2>
            <Form.Group>
                <label>Ensisijainen</label>
                <select name="primaryHeatingSystem" onChange={updateData}>
                    {
                        ([
                            'Kaukolämpö',
                            'Sähkö',
                            'Maalämpö',
                            'Vesi-Ilmalämpöpumppu',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={`heating-primary-option-${index}`} selected={currentData?.primaryHeatingSystem === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Toissijainen</label>
                <select name="secondaryHeatingSystem" onChange={updateData}>
                    {
                        ([
                            'Takka',
                            'Ilmalämpöpumppu',
                            'Muu',
                            'Ei Mitään'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={`heating-secondary-option-${index}`} selected={currentData?.secondaryHeatingSystem === item}>{item || 'Ei Mitään'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>
            
            <h2 className={styles.title}>Katto</h2>
            <Form.Group>
                <label>Katon Materiaali</label>
                <select name="roofMaterial" onChange={updateData}>
                    {
                        ([
                            'Pelti',
                            'Huopa',
                            'Tiili',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={index} selected={currentData?.roofMaterial === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Katon Tyyppi</label>
                <select name="roofType" onChange={updateData}>
                    {
                        ([
                            'Harjakatto',
                            'Pulpettikatto',
                            'Tasakatto',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={index} selected={currentData?.roofType === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>
            
            <h2 className={styles.title}>Pinta-ala</h2>
            <Form.Group>
                <label>Asuintilojen pinta-ala (m<sup>2</sup>)</label>
                <input type="number" name="livingArea" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.livingArea}></input>
            </Form.Group>

            <Form.Group hidden={(['Kerrostalo']).includes(currentData?.buildingType)}>
                <label>Tontin pinta-ala (m<sup>2</sup>)</label>
                <input type="number" name="yardArea" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.yardArea}></input>
            </Form.Group>

            <Form.Group>
                <label>Muut tilat (m<sup>2</sup>)</label>
                <input type="number" name="otherArea" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.otherArea}></input>
            </Form.Group>

            <Form.Group>
                <label>Kokonaispinta-ala (m<sup>2</sup>)</label>
                <span>{getTotalArea(currentData?.area, currentData?.otherArea)}</span>
            </Form.Group>
        </Form>
    )
}