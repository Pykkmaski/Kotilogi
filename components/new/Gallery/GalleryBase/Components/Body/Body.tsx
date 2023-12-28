import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { CSSProperties } from "react";
import { useGalleryContext } from "../../Gallery";

type BodyProps = {
    displayStyle: 'vertical' | 'horizontal',
    itemComponent: React.FC<{item: any}>,
    errorComponent: JSX.Element,
}

export default function Body({displayStyle = 'vertical', itemComponent: ItemComponent, ...props}: BodyProps){
    const {state} = useGalleryContext();

    const bodyStyle: CSSProperties = {
        display: 'flex',
        flexFlow: displayStyle === 'vertical' ? 'column' : 'row wrap',
        gap: '1rem'
    }

    return (
        state.error ? <h1>Tapahtui odottamaton virhe!</h1>
        :
        state.isLoading ? <Spinner size='2rem'/>
        :
        state.data.length ? 

        <div style={bodyStyle}>
            {
                state.data.map((item, index: number) => {
                    return <ItemComponent item={item} key={`gallery-item-${index}`}/>
                })
            }
        </div>

        :
        props.errorComponent
    );
}