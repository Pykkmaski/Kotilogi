import useClassName from "kotilogi-app/hooks/useClassName";
import ImageComponent from 'next/image';
import {Link as NextLink} from 'next/link';

function Card(props){
    const {className} = useClassName('card', props.className);
    return (
        <div className={className}>
            {props.children}
        </div>
    );
}

const Image = (props) => <div className="card-image-container">
    <ImageComponent 
        src={props.src}
        width={200}
        height={200}
    />
</div>

Card.Image = Image;

const Header = (props) => <div className="card-header">{props.children}</div>
Card.Header = Header;

const Title = (props) => <h2 className="card-title">{props.children}</h2>
Card.Title = Title;

const Text = (props) => <div className="card-text">{props.children}</div>
Card.Text = Text;

const Body = (props) => <div className="card-body">{props.children}</div>
Card.Body = Body;

const Footer = (props) => <div className="card-footer">{props.children}</div>
Card.Footer = Footer;

const Menu = (props) => {
    const {className} = useClassName('card-menu', props.open ? 'open' : null);
    return (
        <div className={className} id={props.id}>{props.children}</div>
    );
}
Card.Menu = Menu;

const ControlLink = (props) => {
    const {className, addClass, removeClass} = useClassName('control-link', props.className);

    return(
        <button className={className} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>
    )
}
Card.ControlLink = ControlLink;

const Link = (props) => {
    return (
        <NextLink href={props.href}>
            {props.children}
        </NextLink>
    );
}
Card.Link = Link;

export default Card;