export default function formatCharacterLimit(limit, text) {
    let LIMIT = limit
    const abovLimit = text?.length > LIMIT
    const dotsOrEmpty = abovLimit ? '...' : " "
    let textFormated = text.substring(0, LIMIT) + dotsOrEmpty
    
    return textFormated
}