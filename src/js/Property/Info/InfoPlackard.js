import '../../../scss/InfoPlackard.scss';

function InfoPlackard({content, icon}){
    return (
        <div className="info-plackard">
            <img src={icon}></img>
            <span>{content}</span>
        </div>
    );
}

export default InfoPlackard;