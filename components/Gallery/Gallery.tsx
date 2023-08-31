import styles from './gallery.module.scss';
import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import { GalleryOptions, HeaderProps } from './Types';
import { Header } from './Header';
import { Body } from './Body';

type GalleryProps<T> = {
    options: GalleryOptions,
    data: T[],
}

function Gallery<T>(props: GalleryProps<T>){
    const headerProps: HeaderProps = props.options.header;
    return (
        <div className={styles.container}>
            <GalleryProvider<T> options={props.options} data={props.data}>
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