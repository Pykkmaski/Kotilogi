'use client';

import { getYears } from "kotilogi-app/actions/usage.utils";
import { useQuery } from "kotilogi-app/hooks/useQuery";
import { useState } from "react";

type DateRangeSelectorProps = {
    data: Kotilogi.UsageType[],
    currentYear: string,
}

export function DateRangeSelector({data, currentYear}: DateRangeSelectorProps){
    const {updateQuery, currentQuery} = useQuery('year', currentYear.toString());
    const years = getYears(data);
    
    const getOptions = () => {
        const opts: JSX.Element[] = [];

        for(let i = years.length - 1; i >= 0; --i){
            const selected = years[i] === parseInt(currentYear);
            opts.push(
                <option value={years[i]} selected={selected}>{years[i]}</option>
            );
        }

        return opts;
    }

    return (
        <select name="year" onChange={(e) => updateQuery(e)} className="w-[100px]" defaultValue={parseInt(currentQuery)}>
           {getOptions()}
        </select>
    )
}