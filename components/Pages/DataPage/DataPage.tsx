'use server';

import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";
import { BasePage, BasePageProps } from "../BasePage/BasePage";
import db from "kotilogi-app/dbconfig";
import { DataPageContextProvider } from "./DataPage.context";
import { ListItemProps } from "kotilogi-app/components/ListItem/ListItem";

type DataPageProps<DataT> = BasePageProps & {
    fetchFunction: () => Promise<DataT>,
}

export async function DataPage<DataT>({children, ...props}: DataPageProps<DataT>){
    const data = await props.fetchFunction();

    return (
        <DataPageContextProvider data={data}>
            {children}
        </DataPageContextProvider>
    );
}

type ArrayDataPageProps<DataT extends Kotilogi.ItemType> = {
    heading: string,
    subHeading: string,
    tableName: string,
    query: any,
    itemComponent: React.FC<ListItemProps<DataT>>,
    controlsComponent: React.FC<{}>,
}

export async function ArrayDataPage<DataT extends Kotilogi.ItemType>(props: ArrayDataPageProps<DataT>){
    return(
        <BasePage>
            <Gallery data={data} itemComponent={props.itemComponent}/>
        </BasePage>
    )
}