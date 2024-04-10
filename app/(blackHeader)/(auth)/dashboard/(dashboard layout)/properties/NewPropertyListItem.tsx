import { ListItem, ListItemProps } from "@/components/ListItem/ListItem";
import Link from "next/link";

export function NewPropertyListItem(props: ListItemProps<Kotilogi.PropertyType>){

    const {title, description} = props.item;

    return (
        <ListItem {...props}>
            <ListItem.Body>
                <Link href={`/properties/${props.item.id}/info`} className="flex-1 w-full cursor-pointer no-underline">
                    <ListItem.Header>
                        <div className="flex items-center gap-2">
                            <i className="fa fa-home text-black"/>
                            <h1 className="text-lg text-black">{title}</h1>
                        </div>
                        
                    </ListItem.Header>

                    <ListItem.Description>
                        {description || 'Ei kuvausta.'}
                    </ListItem.Description>

                    <ListItem.Footer>
                        <h2>{props.item.buildingType}</h2>
                    </ListItem.Footer>
                </Link>
            </ListItem.Body>

            <ListItem.Controls>
                <ListItem.CheckBox/>
            </ListItem.Controls>
        </ListItem>
    );
}