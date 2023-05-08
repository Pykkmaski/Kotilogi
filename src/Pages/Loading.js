import LoadingSpinner from "../Components/Spinner";

function Loading({message}){
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>{message}</h1>
            <LoadingSpinner size="4rem"/>
        </div>
    );
}

export default Loading;