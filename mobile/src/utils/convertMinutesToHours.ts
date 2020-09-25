export default function convertMinutesToHours(time: string){

    const timeInt = parseInt(time);

    const timeInHours = timeInt / 60;
    
    return timeInHours;

}