import useSubComponents from "../Hooks/useSubComponents"

function DescriptionElement(props){

    const subComponents = useSubComponents(Object.keys(DescriptionElement), props);

    return (
        <div className="description-element" id={props.id}>
            {
                subComponents.map(component => component)
            }
        </div>
    );
}

const Body = (props) => <div className="description-body">{props.children}</div>
DescriptionElement.Body = Body;

const Title = (props) => <div className="description-title">{props.children}</div>
DescriptionElement.Title = Title;

const Text = (props) => <div className="description-text">{props.children}</div>
DescriptionElement.Text = Text;

const Img = ({src}) => <img src={src} className="description-image" width="200px"></img>
DescriptionElement.Img = Img;

function AppDescription(props){

    return (
        <div className="app-description">
            <div className="app-description-title">
                Kotilogin Toiminnot
            </div>

            <div className="app-description-body">
                <DescriptionElement id="events-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/history.png"/>
                        <DescriptionElement.Title>Tapahtumat</DescriptionElement.Title>

                        <DescriptionElement.Text>
                            Tapahtumiin voit tallentaa niin pienet kuin suuremmat remontit joita taloosi tehdään tai on tehty. 
                            Lisää muutama hyvä kuva, kirjoita kattava kuvaus remontista ja liitteisiin vielä laskut ja muut kuitit.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="usage-description">
                    
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/bolt.png"/>
                        <DescriptionElement.Title>Kulutus</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Kulutus osiossa saat seurattua talosi kulumenoja. Saat lisättyä tärkeimmät: sähkö, vesi ja lämmityskulut. 
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="images-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/image.png"/>
                        <DescriptionElement.Title>Kuvat</DescriptionElement.Title>
                        <DescriptionElement.Text>
                            Tähän osioon voit lisätä vapaasti taloosi liittyviä kuvia. Vaikka muutama kuva eri vuoden aikoina.
                        </DescriptionElement.Text>
                    </DescriptionElement.Body>
                </DescriptionElement>

                <DescriptionElement id="files-description">
                    <DescriptionElement.Body>
                        <DescriptionElement.Img src="img/copy.png"/>
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