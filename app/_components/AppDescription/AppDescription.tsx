"use client";

import Image from 'next/image';
import useSubComponents from "kotilogi-app/hooks/useSubComponents"
import useClassName from "kotilogi-app/hooks/useClassName";

import EventsIcon from 'kotilogi-app/assets/events-img.png';
import UsageIcon from 'kotilogi-app/assets/usage-img.png';
import FilesIcon from 'kotilogi-app/assets/files-img.png';
import ImagesIcon from 'kotilogi-app/assets/images-img.png';

import styles from './styles.module.scss';

function DescriptionElement(props){
    return (
        <div className={styles.element} id={props.id}>
            {
                props.children
            }
        </div>
    );
}

const Body = (props) => <div className={styles.body}>{props.children}</div>
DescriptionElement.Body = Body;

const Title = (props) => <div className={styles.elementTitle}>{props.children}</div>
DescriptionElement.Title = Title;

const Text = (props) => <div className={styles.text}>{props.children}</div>
DescriptionElement.Text = Text;

const Img = (props) => {
    const {className} = useClassName(styles.image, props.className)
    return <img alt="Description Image" src={props.src} className={className}></img>
}
DescriptionElement.Img = Img;

export default function AppDescription(props){

    const imageClassName = "animated";

    return (
        <div className={styles.container}>
            <div className={styles.containerTitle}>
                Kotilogin Toiminnot
            </div>

            <div className={styles.body}>
                <DescriptionElement id={styles.events}>
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src={EventsIcon} className={imageClassName}/>
                        <DescriptionElement.Title>Tapahtumat</DescriptionElement.Title>

                        <DescriptionElement.Text>
                            Tapahtumiin voit tallentaa niin pienet kuin suuremmat remontit joita taloosi tehdään tai on tehty. 
                            Lisää muutama hyvä kuva, kirjoita kattava kuvaus remontista ja liitteisiin vielä laskut ja muut kuitit.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="usage-description">
                    
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src={UsageIcon} className={imageClassName}/>
                        <DescriptionElement.Title>Kulutus</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Kulutus osiossa saat seurattua talosi kulumenoja. Saat lisättyä tärkeimmät: sähkö, vesi ja lämmityskulut. 
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="images-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src={ImagesIcon} className={imageClassName}/>
                        <DescriptionElement.Title>Kuvat</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Tähän osioon voit lisätä vapaasti taloosi liittyviä kuvia. Vaikka muutama kuva eri vuoden aikoina.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="files-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src={FilesIcon} className={imageClassName}/>
                        <DescriptionElement.Title>Tiedostot</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Tähän osioon on hyvä laittaa talteen esimerkiksi rakennuspiirustuksia, tontin lunastuskuitti vuosien takaa jne.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>
            </div>
            
        </div>
    )
}