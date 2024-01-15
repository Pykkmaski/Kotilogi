import { getData } from "kotilogi-app/actions/data/getData";
import { Header as HeaderComponent } from "kotilogi-app/components/Header/Header";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { ListItemProps } from "kotilogi-app/components/ListItem/ListItem";
import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import { Gallery } from "../../Gallery/Gallery";

async function fetchData(tablename: string, query: any){
    const data = await getData(tablename, query);
    return data;
}

type PageWithDataProps<T extends Kotilogi.ItemType> = React.PropsWithChildren & {
    tablename: string,
    query: any,
    /**The layout of the displayed data. */
    display: 'list' | 'card',

    /**The component used to represent the data with. */
    itemComponent: React.FC<ListItemProps<T>>,
}

export async function PageWithData<T extends Kotilogi.ItemType>({children, tablename, query, display, itemComponent: ItemComponent}: PageWithDataProps<T>){
    const data = await fetchData(tablename, query);

    return (
        <main>
            <PageWithDataWrapper data={data}>
                {children}
                <Gallery data={data} display={display} itemComponent={ItemComponent}/>
            </PageWithDataWrapper>
        </main>
    );
}

type HeaderProps = {
    title: string,
    controlsElement: React.ReactNode,
}

function Header({title, controlsElement}: HeaderProps){
    return (
        <HeaderComponent>
            <Heading>{title}</Heading>
            {controlsElement}
        </HeaderComponent>
    );
}

PageWithData.Header = Header;