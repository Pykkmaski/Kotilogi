import useClassName from "../Hooks/useClassName";

function LoadingSpinner({size, message, classNameProp}){
    const className = useClassName('spinner', classNameProp);

    return (
        <div className="spinner-container">
            <div className={className} style={{width: size, height: size}}>

            </div>

            <span className="spinner-message">{message}</span>
        </div>
        
    );
}

export default LoadingSpinner;