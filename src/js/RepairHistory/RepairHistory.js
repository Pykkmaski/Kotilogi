import '../../scss/RepairHistory.scss';

const historyIcon = './img/history.png';

function RepairHistory(props){
    return (
        <div className="page" id="repair-history-page">
            <div className="page-title">
                <img src={historyIcon}></img>
                <h1>Korjaushistoria</h1>
            </div>
            
        </div>
    );
}

export default RepairHistory;