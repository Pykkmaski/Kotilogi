function NoImages(props){

    const imgSrc = './img/no-pictures.png';

    return (
        <div className="error-no-images">
            <img src={imgSrc}/>
            <h2>Ei Kuvia</h2>
        </div>
    )
}

export default NoImages;