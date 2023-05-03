function SortEvents(dates, mode){
    if(mode === 'asc'){
        return dates.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
        });
    }
    else if(mode === 'desc'){
        return dates.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
    
            return dateB - dateA;
        });
    }
}

export default SortEvents;