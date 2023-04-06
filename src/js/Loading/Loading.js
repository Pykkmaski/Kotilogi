import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import './Style.scss';

function Loading({message}){
    return (
        <div className="page" id="loading-page">
            <h1>{message}</h1>
            <LoadingSpinner width="4rem" height="4rem"/>
        </div>
    );
}

export default Loading;