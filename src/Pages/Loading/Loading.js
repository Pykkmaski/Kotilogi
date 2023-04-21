import LoadingSpinner from "../../Components/Spinner/Spinner";

function Loading({message}){
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h1>{message}</h1>
            <LoadingSpinner width="4rem" height="4rem"/>
        </div>
    );
}

export default Loading;