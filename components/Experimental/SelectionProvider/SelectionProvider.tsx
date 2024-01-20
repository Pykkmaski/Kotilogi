import { Group } from "kotilogi-app/components/Group/Group";
import { ListItemProps } from "kotilogi-app/components/ListItem/ListItem";
import React from "react";
import { createContext, useContext, useState } from "react";

const SelectionProviderContext = createContext<any>(null);

type SelectionProviderItemProps<T extends Kotilogi.ItemType> = React.PropsWithChildren & {
    item: T,
}

/**An element wrapper adding a checkbox to its children. */
function SelectionProviderItem<T extends Kotilogi.ItemType>({children, item}: SelectionProviderItemProps<T>){
    const {toggleSelected, selectedContent} = useSelectionProviderContext();

    const isSelected = selectedContent.includes(item);

    return (
        <div style={{border: isSelected ? '1px solid orange' : 'none'}}>
            <Group direction="horizontal">
                {children}
                <input type="checkbox" onChange={() => toggleSelected(item)}/>
            </Group>
        </div>
    );
}

/**Provides item selection logic to it's children */
export function SelectionProvider<T extends React.ReactElement<ListItemProps<Kotilogi.ItemType>>>({children}: React.PropsWithChildren){
    const [selectedContent, setSelectedContent] = useState<T[]>([]);

    const toggleSelected = (item: T) => {
        const newSelected = [...selectedContent];
        const indexOfItem = newSelected.indexOf(item);

        if(indexOfItem !== -1){
            //Deselect the item.
            newSelected.splice(indexOfItem, 1);
        }
        else{
            newSelected.push(item);
        }

        setSelectedContent(newSelected);
    }

    return (
        <SelectionProviderContext.Provider value={{
            toggleSelected, selectedContent
        }}>
            {
                React.Children.map(children, (child: T) => {
                    return (
                        <SelectionProviderItem item={child.props.item}>{child}</SelectionProviderItem>
                    )
                })
            }
        </SelectionProviderContext.Provider>
    );
}

function useSelectionProviderContext(){
    const context = useContext(SelectionProviderContext);
    if(!context) throw new Error('useSelectionProviderContext must be used inside the scope of SelectionProviderContext!');
    return context;
}