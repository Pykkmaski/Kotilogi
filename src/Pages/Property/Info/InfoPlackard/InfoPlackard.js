import './Style.scss';

function InfoPlackard({content, icon, title}){
    return (
        <div className="info-plackard" title={title}>
            <img src={icon}></img>
            <span>{content}</span>
        </div>
    );
}

export default InfoPlackard;