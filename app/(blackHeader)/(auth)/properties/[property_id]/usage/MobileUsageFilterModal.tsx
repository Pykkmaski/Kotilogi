'use client';

import Button from "@/components/Button/Button";
import { CloseButton } from "@/components/CloseButton";
import { Modal } from "@/components/Experimental/Modal/PlainModal/Modal";
import { VisibilityProvider } from "@/components/Util/VisibilityProvider/VisibilityProvider";
import { useQuery } from "kotilogi-app/hooks/useQuery";
import { useRef } from "react";

export function MobileUsageFilterModal({initialYear, timestamps, ...props}){
    const {updateQueryDirectly: updateYearQuery} = useQuery('year', initialYear, 0);
    const {updateQueryDirectly: updateTypeQuery} = useQuery('type', null, 0);

    const yearSelectorRef = useRef<HTMLSelectElement>(null);
    const typeSelectorRef = useRef<HTMLSelectElement>(null);
    
    const types = [
        {
            value: 'all',
            text: 'Kaikki',
        },

        {
            value: 'heat',
            text: 'Lämmitys',
        },

        {
            value: 'water',
            text: 'Vesi',
        },

        {
            value: 'electric',
            text: 'Sähkö',
        },
    ];

    const years: number[] = [];
    for(const stamp of timestamps){
        const year = new Date(stamp.time).getFullYear();
        if(!years.includes(year)){
            years.push(year);
        }
    }

    return (
        <Modal {...props}>
            <div className="flex flex-col rounded-lg bg-white w-full mx-2">
                <Modal.Header>
                    <h1 className="text-slate-500 text-xl">Suodata kulutustiedot</h1>
                    <VisibilityProvider.Trigger>
                        <CloseButton/>
                    </VisibilityProvider.Trigger>
                </Modal.Header>

                <Modal.Body>
                    <div className="flex flex-col gap-2">
                        <select className="w-full" ref={yearSelectorRef}>
                            {
                                years.map(year => <option key={year} value={year}>{year}</option>)
                            }
                        </select>

                        <select className="w-full" ref={typeSelectorRef}>
                            {
                                types.map(type => <option key={type.value} value={type.value}>{type.text}</option>)
                            }
                        </select>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <VisibilityProvider.Trigger>
                        <Button variant="secondary">Sulje</Button>
                    </VisibilityProvider.Trigger>
                    
                    <VisibilityProvider.Trigger>
                        <Button variant="primary-dashboard" onClick={() => {
                            updateYearQuery(yearSelectorRef.current?.value);
                            updateTypeQuery(typeSelectorRef.current?.value);
                        }}>
                            <span className="mx-8">Lähetä</span>
                        </Button>
                    </VisibilityProvider.Trigger>
                </Modal.Footer>
            </div>
        </Modal>
    )
}