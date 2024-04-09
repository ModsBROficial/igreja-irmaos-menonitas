export default function getMonth(month) {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    if (month > 12) {
        const extraMonth = month % 12; 
        return months[extraMonth - 1]; 
    } 
    else if (month >= 1 && month <= 12) {
        return months[month - 1];
    }
}