"use client";

import styles from './gallery.module.scss';
import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import { GalleryOptions, HeaderProps } from './Types';
import { Header } from './Header';
import { Body } from './Body';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import { EventType } from 'kotilogi-app/types/EventType';

type GalleryTypes = PropertyType | EventType;

type GalleryProps = {
    options: GalleryOptions,
    data: GalleryTypes[],
}

function Gallery(props: GalleryProps){
    const headerProps: HeaderProps = props.options.header;
    return (
        <div className={styles.container}>
            <GalleryProvider options={props.options} data={props.data}>
                <Header
                    title={headerProps.title}
                    subtitle={headerProps.subtitle}
                    buttons={headerProps.buttons}
                />

                <Body />
            </GalleryProvider>
        </div>
    );
}

export default Gallery;