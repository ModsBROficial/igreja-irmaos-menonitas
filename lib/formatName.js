export default function formatName(name) {
    if (!name) {
        return null
    }    
    let words = name.trim().split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    let formattedName = words.join(" ");
    return formattedName
}