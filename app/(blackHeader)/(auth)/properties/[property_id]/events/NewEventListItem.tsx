import { ListItem, ListItemProps } from "@/components/ListItem/ListItem";
import Link from "next/link";


export function NewEventListItem({item, selected}: ListItemProps<Kotilogi.EventType>){

    const isConsolidated = parseInt(item.consolidationTime) >= Date.now();

    return (
        <Link href={`/events/${item.id}/info`} className="w-full">
            <ListItem item={item} selected={selected}>
                <ListItem.Header>
                    <div className="flex items-baseline gap-2">
                        <i className="fa fa-history mr-2"/>
                        <h1 className="text-lg">{item.title}</h1>
                        
                        
                        {
                            isConsolidated ? <i className="fa fa-lock text-red-700"/> : null
                        }
                    </div>
                    
                    <div className="flex gap-2 items-baseline z-10">
                        <ListItem.CheckBox/>
                    </div>
                </ListItem.Header>
            
                <ListItem.Body>
                    {item.description || 'Ei kuvausta.'}
                </ListItem.Body>

                <ListItem.Footer>
                    <span>{new Date(item.createdAt).toLocaleDateString('fi-FI') || 'Ei päivämäärää.'}</span>
                </ListItem.Footer>
            </ListItem>
        </Link>
    )
}