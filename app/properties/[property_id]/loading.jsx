import Spinner from "kotilogi-app/components/Spinner/Spinner";

export default function Loading(props){
    return(
        <div id="loading-page">
            <h1>Ladataan...</h1>
            <Spinner size="4rem"/>
        </div>
    );
}