'use client';

import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useGallery } from './Gallery.hooks';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';

type GalleryProps = {
    data: {id: string}[] | null,
    itemComponent: React.FC<{
        item: any,
        selected?: boolean,
    }>,
    display?: 'list' | 'card',
}

/**Responsible for receiving an array of data as props and then rendering them.
*/
export function Gallery({display = 'list', itemComponent: ItemComponent, ...props}: GalleryProps){
    const {state: {selectedItems}} = usePageWithDataContext();

    if(props.data === null) return null;
    
    useEffect(() => {
        console.log('Rendering gallery');
    }, [selectedItems]);
    return (
        <div className={style.container} style={{
            flexFlow: display === 'list' ? 'column' : 'row',
        }}>
            {
                props.data.map(item => {
                    const selected = selectedItems.includes(item as any);
                    
                    return <ItemComponent 
                        item={item} 
                        key={item.id}
                        selected={selected}
                        />
                })
            }
        </div>
    );
}