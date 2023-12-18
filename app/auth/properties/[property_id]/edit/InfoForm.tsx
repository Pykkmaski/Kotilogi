"use client";

import Form from "kotilogi-app/components/Form/Form"
import styles from './page.module.scss';
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import * as Constants from "kotilogi-app/constants";
import { revalidatePath, revalidateTag } from "next/cache";
import { useSearchParams } from "next/navigation";
import updateInfo from "./Util/updateInfo";

export default function InfoForm({property}){
    const searchParams = useSearchParams();
    const [currentData, setCurrentData] = useState(property);
    const initialRender = useRef(true);

    const refs = {
        titleRef: useRef<HTMLInputElement | null>(null),
        descriptionRef: useRef<HTMLTextAreaElement | null>(null),
        yardOwnershipRef: useRef<HTMLSelectElement | null>(null),
        buildYearRef: useRef<HTMLInputElement | null>(null),
        buildingTypeRef: useRef<HTMLSelectElement | null>(null),
        buildingMaterialRef: useRef<HTMLSelectElement | null>(null),
        colorRef: useRef<HTMLSelectElement | null>(null),
        primaryHeatingSystemRef: useRef<HTMLSelectElement | null>(null),
        secondaryHeatingSystemRef: useRef<HTMLSelectElement | null>(null),
        roofMaterialRef: useRef<HTMLSelectElement | null>(null),
        roofTypeRef: useRef<HTMLSelectElement | null>(null),
        livingAreaRef: useRef<HTMLInputElement | null>(null),
        yardAreaRef: useRef<HTMLInputElement | null>(null),
        otherAreaRef: useRef<HTMLInputElement | null>(null),
        energyClassRef: useRef<HTMLSelectElement | null>(null),
        floorCountRef: useRef<HTMLInputElement | null>(null),
        wcCountRef: useRef<HTMLInputElement | null>(null),
        roomCountRef: useRef<HTMLInputElement | null>(null),
    };
    
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
                updateInfo(currentData, property.id);
            }
            catch(err){
                console.log(err.message);
                toast.error('Talon päivitys epäonnistui!');
            }
           
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [currentData]);

    /**Scroll to the position of the input referenced in the to-query on initial render*/
    useEffect(() => {

        const scrollIntoView = (ref) => {
            const to = searchParams.get('to');
            if(ref.current && to === ref.current.name){
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }

        const addActive = (ref) => {
            const to = searchParams.get('to');
            if(ref.current && ref.current.name === to){
                ref.current.classList.add(styles.active);
            }
        }

        Object.values(refs).forEach(ref => {
            scrollIntoView(ref);
            addActive(ref);
        });
        
    }, [searchParams]);

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
                <input ref={refs.titleRef} name="title" onChange={updateData} defaultValue={currentData?.title}></input>
            </Form.Group>

            <Form.Group>
                <label>Kuvaus</label>
                <textarea name="description" onChange={updateData} defaultValue={currentData?.description} spellCheck={false}></textarea>
            </Form.Group>

            <Form.Group hidden={currentData?.buildingType === 'Kerrostalo'}>
                <label>Tontin omistus</label>
                <select ref={refs.yardOwnershipRef} name="yardOwnership" onChange={updateData}>
                    {
                        Constants.yardOwnershipTypes
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
                <input ref={refs.buildYearRef} type="number" step="1" min="1" name="buildYear" onChange={updateData} defaultValue={currentData?.buildYear}></input>
            </Form.Group>

            <Form.Group>
                <label>Asuntotyyppi</label>
                <select ref={refs.buildingTypeRef} name="buildingType" onChange={updateData}>
                    {
                        Constants.buildingTypes
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
                <select ref={refs.buildingMaterialRef} name="buildingMaterial" onChange={updateData}>
                    {
                        Constants.buildingMaterials
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
                <select ref={refs.colorRef} name="color" onChange={updateData}>
                    {
                        Constants.colors
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
                <input ref={refs.floorCountRef} type="number" step="1" min="1" name="floorCount" onChange={updateData} defaultValue={currentData?.floorCount}></input>
            </Form.Group>

            <Form.Group>
                <label>Huoneiden lukumäärä</label>
                <input type="number" step="1" min="1" name="roomCount" onChange={updateData} defaultValue={currentData?.roomCount}></input>
            </Form.Group>

            <Form.Group>
                <label>Vessojen lukumäärä</label>
                <input ref={refs.wcCountRef} type="number" step="1" min="1" name="wcCount" onChange={updateData} defaultValue={currentData?.wcCount}></input>
            </Form.Group>

            <Form.Group>
                <label>Energialuokka</label>
                <select ref={refs.energyClassRef} name="energyClass" onChange={updateData}>
                    {
                        Constants.energyClasses.map((item, index: number) => {
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
                <select ref={refs.primaryHeatingSystemRef} name="primaryHeatingSystem" onChange={updateData}>
                    {
                        Constants.primaryHeatingSystems
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
                <select ref={refs.secondaryHeatingSystemRef} name="secondaryHeatingSystem" onChange={updateData}>
                    {
                        Constants.secondaryHeatingSystems
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
                <select ref={refs.roofMaterialRef} name="roofMaterial" onChange={updateData}>
                    {
                        Constants.roofMaterials
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
                <select ref={refs.roofTypeRef} name="roofType" onChange={updateData}>
                    {
                        Constants.roofTypes
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
                <input ref={refs.livingAreaRef} type="number" name="livingArea" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.livingArea}></input>
            </Form.Group>

            <Form.Group hidden={(['Kerrostalo']).includes(currentData?.buildingType)}>
                <label>Tontin pinta-ala (m<sup>2</sup>)</label>
                <input ref={refs.yardAreaRef} type="number" name="yardArea" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.yardArea}></input>
            </Form.Group>

            <Form.Group>
                <label>Muut tilat (m<sup>2</sup>)</label>
                <input ref={refs.otherAreaRef} type="number" name="otherArea" onChange={updateData} step="0.01" min="1" defaultValue={currentData?.otherArea}></input>
            </Form.Group>

            <Form.Group>
                <label>Kokonaispinta-ala (m<sup>2</sup>)</label>
                <span>{getTotalArea(currentData?.area, currentData?.otherArea)}</span>
            </Form.Group>
        </Form>
    )
}