"use client";

import Image from 'next/image';
import useSubComponents from "kotilogi-app/hooks/useSubComponents"
import useClassName from "kotilogi-app/hooks/useClassName";

import EventsIcon from 'kotilogi-app/assets/history.png';
import UsageIcon from 'kotilogi-app/assets/bolt.png';
import ImagesIcon from 'kotilogi-app/assets/image.png';
import FilesIcon from 'kotilogi-app/assets/copy.png';

import style from './style.module.scss';
import Carousel from 'kotilogi-app/components/Carousel/Carousel';

export function DescriptionElement(props){
    return (
        <div className={style.element} id={props.id}>
            {
                props.children
            }
        </div>
    );
}

const Body = (props) => <div className={style.body}>{props.children}</div>
DescriptionElement.Body = Body;

const Title = (props) => <div className={style.elementTitle}>{props.children}</div>
DescriptionElement.Title = Title;

const Text = (props) => <div className={style.text}>{props.children}</div>
DescriptionElement.Text = Text;

const Img = (props) => {
    const {className} = useClassName(style.image, props.className)
    return <Image alt="Description Image" src={props.src} className={className} width={100} height={100}></Image>
}
DescriptionElement.Img = Img;

export default function AppDescription(props){

    const imageClassName = "animated";
    const carouselItems = [
        <DescriptionElement id={style.eventsElement} style={{backgroundImage: 'url(/img/AppDescription/events-img.png)'}}>
            <DescriptionElement.Text>
                <DescriptionElement.Title><span>Tapahtumat</span> <DescriptionElement.Img src={EventsIcon}></DescriptionElement.Img> </DescriptionElement.Title>
                Tapahtumiin voit tallentaa niin pienet kuin suuremmat remontit joita taloosi tehdään tai on tehty. 
                Lisää muutama hyvä kuva, kirjoita kattava kuvaus remontista ja liitteisiin vielä laskut ja muut kuitit.
            </DescriptionElement.Text>
            
        </DescriptionElement>,

        <DescriptionElement id={style.usageElement}>    
            <DescriptionElement.Text>
                <DescriptionElement.Title><span>Kulutus</span> <DescriptionElement.Img src={UsageIcon}></DescriptionElement.Img> </DescriptionElement.Title>
                Kulutus osiossa saat seurattua talosi kulumenoja. Saat lisättyä tärkeimmät: sähkö, vesi ja lämmityskulut. 
            </DescriptionElement.Text>
            
        </DescriptionElement>,

        <DescriptionElement id="images-description">
            <DescriptionElement.Text>
                <DescriptionElement.Title><span>Kuvat</span> <DescriptionElement.Img src={ImagesIcon}></DescriptionElement.Img> </DescriptionElement.Title>
                Tähän osioon voit lisätä vapaasti taloosi liittyviä kuvia. Vaikka muutama kuva eri vuoden aikoina.
            </DescriptionElement.Text>
            
        </DescriptionElement>,

        <DescriptionElement id="files-description">
            <DescriptionElement.Text>
                <DescriptionElement.Title><span>Tiedostot</span> <DescriptionElement.Img src={FilesIcon}></DescriptionElement.Img> </DescriptionElement.Title>
                Tähän osioon on hyvä laittaa talteen esimerkiksi rakennuspiirustuksia, tontin lunastuskuitti vuosien takaa jne.
            </DescriptionElement.Text>
            
        </DescriptionElement>
    ];

    return (
        <section className={style.container}>
            <Carousel items={carouselItems} autoScroll={true}/>
        </section>
    );
}