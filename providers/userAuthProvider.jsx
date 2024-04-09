import { createContext, useEffect, useState } from 'react'
import useUserAuth from "@/hooks/useUserAuth"

const contextUserAuth = createContext()

function UserAuthProvider({ children }) {

    const { login, user, logout } = useUserAuth()
    const [themeUser, setThemeUser] = useState(false)

    function toggleTheme(){
        let theme = localStorage.getItem('theme')
        if (!theme) {
            setThemeUser(true)
            localStorage.setItem('theme', 'dark' )
            document.documentElement.classList.add('dark')
        } else {
            setThemeUser(false)
            localStorage.removeItem('theme' )
            document.documentElement.classList.remove('dark')
        }
    }

    function checkTheme(){
        const theme = localStorage.getItem('theme')

        if (theme) {
            setThemeUser(true)
            document.documentElement.classList.add('dark')
        }else{
            setThemeUser(false)
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(()=>{
        checkTheme()
    },[])


    return <contextUserAuth.Provider value={{ login, user, logout, toggleTheme, themeUser, checkTheme }} >{children}</contextUserAuth.Provider>
}

export { contextUserAuth, UserAuthProvider }