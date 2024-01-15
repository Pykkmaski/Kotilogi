'use client';

import { ListItemProps } from "kotilogi-app/components/ListItem/ListItem";
import { createContext, useContext, useState } from "react";

const DataProviderContext = createContext<any>(null);

type DataProviderProps<T> = React.PropsWithChildren & {
    initialData: T[],
}

/**A component providing an array of data to it's children to consume. */
export function DataProvider<T>({children, ...props}: DataProviderProps<T>){
    const [data, setData] = useState<T[]>(props.initialData);

    const addData = (newItem: T) => {
        const newData = [...data, newItem];
        setData(newData);
    }

    const deleteData = (item: T) => {
        const newData = [...data];
        const indexOfItem = newData.indexOf(item);

        if(indexOfItem !== -1){
            newData.splice(indexOfItem, 1);
            setData(newData);
            return true;
        }
        else{
            return false;
        }
        
    }

    return (
        <DataProviderContext.Provider value={{
            data,
            addData,
            deleteData,
        }}>
            {children}
        </DataProviderContext.Provider>
    );
}

type ListProps = {
    display: 'list' | 'grid',
    itemComponent: React.FC<ListItemProps<any>>,
}

/**A component responsible for displaying the data provided by a Dataprovider. */
function List({display, itemComponent: ItemComponent}: ListProps){
    const {data} = useDataProviderContext();

    return (
        <div style={{
            display: 'flex',
            flexFlow: display === 'list' ? 'column' : 'row',
        }}>
            <SelectProvider>
                {
                    data.map(item => <ItemComponent item={item}/>)
                }
            </SelectProvider>
            
        </div>
    );
}

DataProvider.List = List;

type SelectProviderProps = React.PropsWithChildren;

const SelectProviderContext = createContext<any>(null);

/**A add-on provider for a DataProvider, adding item selection functionality to the consumed data. */
export function SelectProvider<T>({children, ...props}: SelectProviderProps){
    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    const toggleSelected = (item: T) => {
        const indexOfItem = selectedItems.indexOf(item);
        if(indexOfItem === -1){
            //Item is not selected.
            setSelectedItems(prev => [...prev, item]);
        }
        else{
            //Item is selected. Deselect it.
            const newSelected = [...selectedItems];
            newSelected.splice(indexOfItem, 1);
            setSelectedItems(newSelected);
        }
    }

    return (
        <SelectProviderContext.Provider value={{selectedItems, toggleSelected}}>
            {children}
        </SelectProviderContext.Provider>
    );
}

function useDataProviderContext(){
    const context = useContext(DataProviderContext);
    if(!context) throw new Error('useDataProviderContext must be used within the scope of a DataProviderContext!');
    return context;
}