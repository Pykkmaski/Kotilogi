function NoFiles(props){

    const imgSrc = './img/paper.png';
    
    return (
        <div className="error-no-files">
            <img src={imgSrc}></img>
            <h2>Ei tiedostoja</h2>
        </div>
    );
}

export default NoFiles;