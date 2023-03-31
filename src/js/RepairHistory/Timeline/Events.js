import '../../../scss/RepairHistory.scss';

function Events({history, selectedYear}){

    return (
        <div id="timeline-events">
            {
                history.filter(item => item.created_at.split(' ')[0].split('-')[0] === selectedYear).map(item => {
                    const component = (
                        <div className={`event-entry`}>
                            <header>
                                <h2>
                                    {item.name}
                                </h2>
                            </header>

                            <div className={"event-body"} >
                                <span>{item.description}</span>
                                <span><strong>{item.created_at}</strong></span>
                            </div>
                        </div>
                    )
                    return component;
                })
            }
        </div>
    )
}

export default Events;