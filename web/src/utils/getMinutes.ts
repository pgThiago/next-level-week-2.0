export default function convertMinutesToHours(time: string){
    const timeInt = parseInt(time);
    const minutes = timeInt % 60;
    return minutes;
}