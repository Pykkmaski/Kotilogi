import './Style.scss';
const homeIcon = './img/home-icon.png';

function PropertyCard({content}){

    return (
        <div className="property-card">
            <img src={homeIcon}/>
            <h1>{content}</h1>
        </div>
    );
}

export default PropertyCard;