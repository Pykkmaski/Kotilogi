'use client';

import { serverAddData } from "kotilogi-app/actions/data/addData";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import { serverGetData } from "kotilogi-app/actions/serverGetData";
import serverUpdateDataById from "kotilogi-app/actions/serverUpdateDataById";
import { useEffect, useState } from "react";

/**
 * Client-side hook for fetching and updating data contained in a database table.
 * @param tableName The name of the database table containing the data.
 * @param query A query-object accepted by the knex where-method.
 */

type DataType = Kotilogi.EventType | Kotilogi.PropertyType | (Kotilogi.EventType | Kotilogi.PropertyType)[] | null;

export default function useData(tableName: Kotilogi.Table, query: any, onlyOne: boolean = false){
    const [data, setData]       = useState<DataType>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(false);

    const getData = () => {
        serverGetData(tableName, query, onlyOne)
        .then(data => {
            if(!data) {
                setError(true);
            }
            else{
                setData(data as DataType);
            }
            
        })
        .catch(err => {
            console.log(err.message);
            setError(true);
        })
        .finally(() => {
            console.log('Data loaded');
            setLoading(false);
        });
    }

    const addData = (newData: DataType): Promise<void> => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            serverAddData(newData, tableName)
            .then(result => { if(!result) setError(true)})
            .catch(err => reject(err))
            .finally(() => {
                if(error) return;
                getData();
                resolve();
            });
        })
       
    }

    const deleteData = (ids: Kotilogi.IdType[]) => {
        setLoading(true);
        serverDeleteDataByIds(ids, tableName)
        .then(result => {if(!result) setError(true)})
        .finally(() => {
            if(error) return;
            getData();
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return {
        data, 
        loading, 
        error,
        addData,
        deleteData,
    };
}