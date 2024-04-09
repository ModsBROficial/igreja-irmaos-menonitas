export default function formatDate(date) {
    if (!date) {
        return null
    }    
    let day = new Date(date).getDate().toString().padStart(2, '0')
    let month = (new Date(date).getMonth()+1).toString().padStart(2, '0')
    let year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
}