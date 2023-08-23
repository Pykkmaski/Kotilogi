const defaultImage = './img/no-pictures.png';

function InteractiveImage({src, width}){
    
    return (
        <img 
            src={src}
            width={width}
            onError={(e) => {
                e.target.src = defaultImage;
            }}
        />
    )
}

export default InteractiveImage;