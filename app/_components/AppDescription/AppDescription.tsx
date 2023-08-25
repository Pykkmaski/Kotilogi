"use client";

import useSubComponents from "kotilogi-app/hooks/useSubComponents"
import useClassName from "kotilogi-app/hooks/useClassName";
import styles from './styles.module.scss';

function DescriptionElement(props){

    const subComponents = useSubComponents(Object.keys(DescriptionElement), props);

    return (
        <div className={styles.element} id={props.id}>
            {
                subComponents.map(component => component)
            }
        </div>
    );
}

const Body = (props) => <div className={styles.body}>{props.children}</div>
DescriptionElement.Body = Body;

const Title = (props) => <div className={styles.title}>{props.children}</div>
DescriptionElement.Title = Title;

const Text = (props) => <div className={styles.text}>{props.children}</div>
DescriptionElement.Text = Text;

const Img = (props) => {
    const {className} = useClassName(styles.image, props.className)
    return <img src={props.src} className={className} width="200px"></img>
}
DescriptionElement.Img = Img;

function AppDescription(props){

    const imageClassName = "animated";

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Kotilogin Toiminnot
            </div>

            <div className={styles.body}>
                <DescriptionElement id={styles.events}>
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/history.png" className={imageClassName}/>
                        <DescriptionElement.Title>Tapahtumat</DescriptionElement.Title>

                        <DescriptionElement.Text>
                            Tapahtumiin voit tallentaa niin pienet kuin suuremmat remontit joita taloosi tehdään tai on tehty. 
                            Lisää muutama hyvä kuva, kirjoita kattava kuvaus remontista ja liitteisiin vielä laskut ja muut kuitit.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="usage-description">
                    
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/bolt.png" className={imageClassName}/>
                        <DescriptionElement.Title>Kulutus</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Kulutus osiossa saat seurattua talosi kulumenoja. Saat lisättyä tärkeimmät: sähkö, vesi ja lämmityskulut. 
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="images-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/image.png" className={imageClassName}/>
                        <DescriptionElement.Title>Kuvat</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Tähän osioon voit lisätä vapaasti taloosi liittyviä kuvia. Vaikka muutama kuva eri vuoden aikoina.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="files-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/copy.png" className={imageClassName}/>
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

export default AppDescription;