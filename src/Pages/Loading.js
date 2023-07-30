import LoadingSpinner from "../Components/Spinner";

function Loading({message}){
    return (
        <div id="loading-page">
            <h1>{message}</h1>
            <LoadingSpinner size="4rem"/>
        </div>
    );
}

export default Loading;