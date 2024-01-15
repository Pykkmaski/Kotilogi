'use server';

import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import db from "kotilogi-app/dbconfig";

type DataPageProps<DataT> = React.ComponentProps<'main'> & {
    data: DataT[],
}

export async function DataPage<DataT extends Kotilogi.ItemType>({children, data, ...props}: DataPageProps<DataT>){
    return (
        <main {...props}>
            <PageWithDataWrapper<DataT> data={data}>
                {children}
            </PageWithDataWrapper>
        </main>
    );
}