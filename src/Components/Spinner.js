function LoadingSpinner({size, message}){

    return (
        <div className="spinner-container">
            <div className="spinner" style={{width: size, height: size}}>

            </div>

            <span className="spinner-message">{message}</span>
        </div>
        
    );
}

export default LoadingSpinner;