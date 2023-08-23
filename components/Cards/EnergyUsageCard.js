import { useContext } from 'react';
import Card from './Card';
import Button from '../Buttons/Button';

function EnergyUsageCard({usage, editing, functions}){

    const date = new Date(usage.time).toLocaleDateString();

    return (
        <Card key={`usage-card-${usage.id}`}>
            <Card.Body>
                <Card.Title>{date}</Card.Title>
                <div className="card-text">
                    <span>Wattimäärä: {usage.watt_amount}</span>
                    <span>Hinta: {usage.price}</span>
                </div>
            </Card.Body>

            {
                editing ? 
                <Card.Footer>
                    <Button className="danger" onClick={() => functions.deleteEvent(event.id)}>Poista</Button>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    )
}

export default EnergyUsageCard;