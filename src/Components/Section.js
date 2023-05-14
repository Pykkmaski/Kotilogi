import useClassName from "../Hooks/useClassName";
import useSubComponents from "../Hooks/useSubComponents";

function Section(props){
    const subComponents = useSubComponents(Object.keys(Section), props);
    return (
        <div className="section">
            {
                subComponents.map((component) => component)
            }
        </div>
    );
}

const Header = (props) => <div className="section-header">{props.children}</div>
Section.Header = Header;

const Body = (props) => {
    const className = useClassName('section-body', props.className || '');
    return(
        <div className={className}>{props.children}</div>
    )
}

Section.Body = Body;

const Div = (props) => {
    const className = useClassName('section-div', props.className || '');
    return <div className={className}>{props.children}</div>
}
Section.Div = Div;

const Footer = (props) => <div className="section-footer">{props.children}</div>
Section.Footer = Footer;

export default Section;