'use client';

import { useEffect, useState } from 'react';
import style from './style.module.scss';
import { useGallery } from './Gallery.hooks';

type GalleryProps = {
    data: {id: string}[] | null,
    itemComponent: React.FC<{
        item: any,
    }>,
    display?: 'list' | 'card',
}

/**Responsible for receiving an array of data as props and then rendering them.
*/
export function Gallery({display = 'list', itemComponent: ItemComponent, ...props}: GalleryProps){
    if(props.data === null) return null;
    
    return (
        <div className={style.container} style={{
            flexFlow: display === 'list' ? 'column' : 'row',
        }}>
            {
                props.data.map(item => {
                    return <ItemComponent 
                        item={item} 
                        key={item.id}/>
                })
            }
        </div>
    );
}