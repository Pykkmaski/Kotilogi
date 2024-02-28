'use client';

import { useQuery } from "kotilogi-app/hooks/useQuery";
import { useState } from "react";

export function DateRangeSelector({startYear}){
    const currentYear = new Date().getFullYear();

    const {updateQuery, currentQuery} = useQuery('year', currentYear.toString());

    const getOptions = () => {
        const opts: JSX.Element[] = [];

        console.log(currentYear);
        console.log(startYear);
        
        for(var i = currentYear; i >= startYear; --i){
            console.log(i);
            opts.push(
                <option value={i} selected={i === parseInt(currentQuery)}>{i}</option>
            );
        }
        return opts;
    }

    return (
        <select name="year" onChange={(e) => updateQuery(e)} className="w-[100px]">
           {getOptions()}
        </select>
    )
}