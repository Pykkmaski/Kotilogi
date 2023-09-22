"use client";

import { serverGetDataById } from "kotilogi-app/actions/serverGetData";
import { useEffect, useState } from "react";

type Props = {
    eventId: Kotilogi.IdType,
}

export default function useEvent(props: Props){

    const [event, setEvent]         = useState<null | object>(null);
    const [loading, setLoading]     = useState<boolean>(true);
    const [error, setError]         = useState<boolean>(false);

    useEffect(() => {
        serverGetDataById(props.eventId, 'propertyEvents')
        .then(event => {
            if(!event){
                setError(true);
            }
            else{
                setEvent(event);
            }
        })
        .finally(() => {
            setLoading(false);
        })
    }, [props.eventId]);

    return {event, loading, error};
}