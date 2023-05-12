import useSubComponents from "../Hooks/useSubComponents";

function Card(props){

    const subComponents = useSubComponents(Object.keys(Card), props);
    return (
        <div className="card">
            {
                subComponents.map((component) => component)
            }
        </div>
    );
}

const Image = (props) => <div className="card-image-container">
    <img className="card-image" src={props.src} onError={(e) => {
        e.target.classList.add('error-image'); 
        e.target.src = './img/no-pictures.png';
        if(props.onError) props.onError(e);
        }} 
        loading={props.loading}
    />
</div>

Card.Image = Image;

const Header = (props) => <div className="card-header">{props.children}</div>
Card.Header = Header;

const Title = (props) => <h2 className="card-title">{props.children}</h2>
Card.Title = Title;

const Body = (props) => <div className="card-body">{props.children}</div>
Card.Body = Body;

const Footer = (props) => <div className="card-footer">{props.children}</div>
Card.Footer = Footer;

export default Card;