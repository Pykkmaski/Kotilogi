'use client';

import { Key, useEffect, useState } from 'react';
import style from './style.module.scss';
import { useGallery } from './Gallery.hooks';
import { usePageWithDataContext } from 'kotilogi-app/components/PageWithData/PageWithData';

type GalleryProps<DataT> = {
    data: DataT[] | null,
    itemComponent: React.FC<{
        item: DataT,
        selected?: boolean,
    } & {key: React.Key}>,
    display?: 'list' | 'card',
}

/**Responsible for receiving an array of data as props and then rendering them.
*/
export function Gallery<DataT extends Kotilogi.ItemType>({display = 'list', itemComponent: ItemComponent, ...props}: GalleryProps<DataT>){
    const {state: {selectedItems}} = usePageWithDataContext();

    if(props.data === null) return null;
    
    return (
        <div className={style.container} style={{
            flexFlow: display === 'list' ? 'column' : 'row',
        }}>
            {
                props.data.map(item => {
                    const selected = selectedItems.includes(item);
    
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