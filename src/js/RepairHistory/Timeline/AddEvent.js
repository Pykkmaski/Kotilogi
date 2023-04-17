import {useParams} from 'react-router-dom';

const plusIcon = './img/plus.png';

function AddEvent(props){

    const {id} = useParams();

    function onClickHandler(){
        location.assign(`/#/property/${id}/events/add`);
    }   

    return (
        <div className="flex-row space-between center-align padding-m hover-primary-light rounded" onClick={onClickHandler}>
            <img src={plusIcon} width="100px"/>
            <h2>Lisää uusi tapahtuma</h2>
        </div>
    )
}

export default AddEvent;