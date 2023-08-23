function NoUsage(props){

    const imgSrc = './img/bolt.png';

    return (
        <div className="error-no-usage">
            <img src={imgSrc}/>
            <h2>Ei Kulutustietoja</h2>
        </div>
    )
}

export default NoUsage;