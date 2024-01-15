import { createContext, useState } from "react";

type SelectProviderProps = React.PropsWithChildren;

const SelectProviderContext = createContext<any>(null);

/**An add-on provider for a DataProvider, adding item selection functionality to the consumed data. */
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