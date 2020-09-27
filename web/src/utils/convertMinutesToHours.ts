export default function convertMinutesToHours(time: string){

    const timeInt = parseInt(time);

    const timeInHours = timeInt / 60;

    const hourString = `${timeInHours}`;

    const hour = hourString.split('.');
    
    return hour[0];

}