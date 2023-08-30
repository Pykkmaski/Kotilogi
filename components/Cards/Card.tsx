import useClassName, {ReturnType} from "kotilogi-app/hooks/useClassName";
import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";
import ImageComponent from 'next/image';
import NextLink from "next/link";

function Card(props: any){
    const {className} = useClassName("card", props.className);
    return (
        <div className={className} key={props.key}>
            {props.children}
        </div>
    );
}

export type ImageProps = {
    src: string | StaticImageData,
}

const Image = (props: ImageProps) => <div className="card-image-container">
    <ImageComponent 
        src={props.src}
        width={200}
        height={200}
        alt="Card Image"
    />
</div>
Card.Image = Image;

const Header = (props) => <div className="card-header">{props.children}</div>
Card.Header = Header;

const Title = (props) => <h2 className={"card-title"}>{props.children}</h2>
Card.Title = Title;

const Text = (props) => <div className={"card-text"}>{props.children}</div>
Card.Text = Text;

const Body = (props) => <div className={"card-body"}>{props.children}</div>
Card.Body = Body;

const Footer = (props) => <div className={"card-footer"}>{props.children}</div>
Card.Footer = Footer;

export type MenuProps = {
    open: boolean,
    id: string | undefined,
    children: any,
}

const Menu = ({open, id, children}: MenuProps) => {
    const {className} = useClassName("card-menu", open ? "open" : null);
    return (
        <dialog className={className} id={id} open={open}>{children}</dialog>
    );
}
Card.Menu = Menu;

const Link = (props) => {
    return (
        <NextLink href={props.href}>
            {props.children}
        </NextLink>
    );
}
Card.Link = Link;

export default Card;