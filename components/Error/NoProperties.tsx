function NoProperties(props){

    const imgSrc = './img/house.png';

    return (
        <div className="error-no-usage">
            <img src={imgSrc}/>
            <h2>Ei Talotietoja</h2>
        </div>
    )
}

export default NoProperties;