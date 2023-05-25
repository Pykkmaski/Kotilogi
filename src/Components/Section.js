import useClassName from "../Hooks/useClassName";
import useSubComponents from "../Hooks/useSubComponents";

function Section(props){
    const subComponents = useSubComponents(Object.keys(Section), props);
    return (
        <div className="section" id={props.id}>
            {
                subComponents.map((component) => component)
            }
        </div>
    );
}

const Header = (props) => {
    console.log('Rendering header...');
    const className = useClassName('section-header', props.className);
    return <div className={className}>{props.children}</div>
}

const Heading = (props) => {
    return (
        <div className="label-heading">
            <span className="label">{props.labelText}</span>
            <h1>{props.subLabelText}</h1>
        </div>
    )
}

Header.Heading = Heading;
Section.Header = Header;

const Body = (props) => {
    const className = useClassName('section-body', props.className);
    return(
        <div className={className}>{props.children}</div>
    )
}

Section.Body = Body;

const Div = (props) => {
    const className = useClassName('section-div', props.className);
    return <div className={className}>{props.children}</div>
}
Section.Div = Div;

const Footer = (props) => <div className="section-footer">{props.children}</div>
Section.Footer = Footer;

export default Section;