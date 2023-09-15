"use client";

import Form from "kotilogi-app/components/Form"
import styles from './page.module.scss';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";

export default function InfoForm({property}){
    const [currentData, setCurrentData] = useState(property);
    const initialRender = useRef(true);

    const updateData = (e) => {
        if(!currentData) return;

        setCurrentData({
            ...currentData,
            [e.target.name]: e.target.value,
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
                await serverUpdateDataById(currentData, 'properties');
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
                <span className={styles.ownerText}>{currentData?.ref_id}</span>
            </Form.Group>

            <Form.Group>
                <label>Osoite</label>
                <input name="title" onChange={updateData} defaultValue={currentData?.title}></input>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" onChange={updateData} defaultValue={currentData?.description} spellCheck={false}></textarea>
            </Form.Group>

            <Form.Group hidden={currentData?.property_type === 'Kerrostalo'}>
                <label>Tontin omistus</label>
                <select name="yard_ownership" onChange={updateData}>
                    {
                        [
                            'Oma',
                            'Vuokra',
                            'Ei Kelvollinen'
                        ]
                        .map((item: string, index: number) => {
                            return (
                                <option value={item} selected={currentData?.yard_ownership === item}>{item}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Rakennusvuosi</label>
                <input type="number" step="1" min="1" name="build_year" onChange={updateData} defaultValue={currentData?.build_year}></input>
            </Form.Group>

            <Form.Group>
                <label>Asuntotyyppi</label>
                <select name="property_type" onChange={updateData}>
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
                                <option value={item} key={'property-type-option-' + index} selected={currentData?.property_type === item}>{item}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Rakennusmateriaali</label>
                <select name="building_material" onChange={updateData}>
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
                                <option value={item} key={`building-material-${index}`} selected={currentData?.building_material == item}>{item || 'Muu'}</option>
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
                <label>{currentData?.property_type === 'Kerrostalo' ? 'Kerros' : 'Kerrosten lukumäärä'}</label>
                <input type="number" step="1" min="1" name="floor_count" onChange={updateData} defaultValue={currentData?.floor_count}></input>
            </Form.Group>

            <Form.Group>
                <label>Huoneiden lukumäärä</label>
                <input type="number" step="1" min="1" name="room_count" onChange={updateData} defaultValue={currentData?.room_count}></input>
            </Form.Group>

            <Form.Group>
                <label>Vessojen lukumäärä</label>
                <input type="number" step="1" min="1" name="wc_count" onChange={updateData} defaultValue={currentData?.wc_count}></input>
            </Form.Group>

            <Form.Group>
                <label>Energialuokka</label>
                <select name="energy_class" onChange={updateData}>
                    {
                        (['A', 'B', 'C', 'D', 'E', 'F', 'Ei Määritelty']).map((item, index: number) => {
                            return (
                                <option value={item} key={index} selected={currentData?.energy_class === item}>{item || 'Ei Määritelty'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <h2 className={styles.title}>Lämmitysjärjestelmät</h2>
            <Form.Group>
                <label>Ensisijainen</label>
                <select name="primary_heating_system" onChange={updateData}>
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
                                <option value={item} key={`heating-primary-option-${index}`} selected={currentData?.primary_heating_system === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Toissijainen</label>
                <select name="secondary_heating_system" onChange={updateData}>
                    {
                        ([
                            'Takka',
                            'Ilmalämpöpumppu',
                            'Muu',
                            'Ei Mitään'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={`heating-secondary-option-${index}`} selected={currentData?.secondary_heating_system === item}>{item || 'Ei Mitään'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>
            
            <h2 className={styles.title}>Katto</h2>
            <Form.Group>
                <label>Katon Materiaali</label>
                <select name="roof_material" onChange={updateData}>
                    {
                        ([
                            'Pelti',
                            'Huopa',
                            'Tiili',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={index} selected={currentData?.roof_material === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>

            <Form.Group>
                <label>Katon Tyyppi</label>
                <select name="roof_type" onChange={updateData}>
                    {
                        ([
                            'Harjakatto',
                            'Pulpettikatto',
                            'Tasakatto',
                            'Muu'
                        ])
                        .map((item, index: number) => {
                            return (
                                <option value={item} key={index} selected={currentData?.roof_type === item}>{item || 'Muu'}</option>
                            )
                        })
                    }
                </select>
            </Form.Group>
            
            <h2 className={styles.title}>Pinta-ala</h2>
            <Form.Group>
                <label>Asuintilojen pinta-ala (m<sup>2</sup>)</label>
                <input type="number" name="area" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.area}></input>
            </Form.Group>

            <Form.Group hidden={(['Kerrostalo']).includes(currentData?.property_type)}>
                <label>Tontin pinta-ala (m<sup>2</sup>)</label>
                <input type="number" name="yard_area" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.yard_area}></input>
            </Form.Group>

            <Form.Group>
                <label>Muut tilat (m<sup>2</sup>)</label>
                <input type="number" name="other_area" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.other_area}></input>
            </Form.Group>

            <Form.Group>
                <label>Kokonaispinta-ala (m<sup>2</sup>)</label>
                <span>{getTotalArea(currentData?.area, currentData?.other_area)}</span>
            </Form.Group>
        </Form>
    )
}