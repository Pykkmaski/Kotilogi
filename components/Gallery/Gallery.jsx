"use client";

import useClassName from "kotilogi-app/hooks/useClassName";
import useSubComponents from "kotilogi-app/hooks/useSubComponents";
import styles from './component.module.scss';

function Gallery(props){
    const {className} = useClassName(styles.container, props.className);
    const subComponents = useSubComponents(Object.keys(Gallery), props);

    return (
        <div className={className}>
            {
                subComponents.map(component => component)
            }
        </div>
    )
}

const plusIcon = './img/plus.png';

const Button = (props) => <div className={styles.addButton} onClick={props.onClickHandler}> 
    <div className="icon-container">
        <img src={plusIcon}/>
    </div>
    <span className={styles.buttonTitle}>{props.title}</span>
</div>
Gallery.Button = Button;

const Body = (props) => {
    const {className} = useClassName(styles.body, props.className);
    return (
        <div className={className}>{props.children}</div>
    );
}
Gallery.Body = Body;

const Header = (props) => {
    const {className} = useClassName(styles.header, props.className);
    return (
        <div className={className} id={props.id}>{props.children}</div>
    )
}
Gallery.Header = Header;

export default Gallery;