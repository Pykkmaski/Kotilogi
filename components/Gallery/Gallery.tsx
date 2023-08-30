"use client";

import styles from './gallery.module.scss';
import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import { HeaderProps } from './Types';
import { Header } from './Header';
import { Body } from './Body';

function Gallery({options, data}){
    const headerProps: HeaderProps = options.header;
    return (
        <div className={styles.container}>
            <GalleryProvider options={options} data={data}>
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