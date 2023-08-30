function Unauthorized(props){
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>Pääsy Evätty!</h1>
            <h2>Sinun täytyy olla kirjautuneena sisään nähdäksesi tämän sivun!</h2>
        </div>
    );
}

export default Unauthorized;