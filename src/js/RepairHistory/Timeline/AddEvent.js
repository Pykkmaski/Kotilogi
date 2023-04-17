import {useParams} from 'react-router-dom';

const plusIcon = './img/plus.png';

import './Style.scss';

function AddEvent(props){

    const {id} = useParams();

    function onClickHandler(){
        location.assign(`/#/property/${id}/events/add`);
    }   

    return (
        <div id="add-event" className="flex-row gap-l border center-align padding-m hover-primary-light rounded" onClick={onClickHandler}>
            <img src={plusIcon} width="75px"/>
            <h2>Lisää uusi tapahtuma</h2>
        </div>
    )
}

export default AddEvent;