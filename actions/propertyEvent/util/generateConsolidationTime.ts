/**Generates a consolidation time from the current date + the consolidation delay environment variable. */
export function generateConsolidationTime(){
    const consolidationDelay = process.env.EVENT_CONSOLIDATION_TIME;
    if(!consolidationDelay) throw new Error('generateConsolidationTime: EVENT_CONSOLIDATION_TIME environment variable is missing!');

    return Date.now() + parseInt(consolidationDelay);
}