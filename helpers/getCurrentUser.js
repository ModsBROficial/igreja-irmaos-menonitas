import Cookies from "js-cookie"

export function getCurrentUser(){
    let cookie = Cookies.get("user")

    let user = JSON.parse(cookie);
    if (!user) {
        return null
    }
    return user
}