export default function formatHourAndMinutes(date){
    const data = new Date(date);
    const hour = data.getHours().toString().padStart(2, '0');
    const minutes = data.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minutes}`;
}