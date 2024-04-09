import api from '@/utils/api'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useFlashMessage from './useFlashMessage'
import Cookies from "js-cookie"

export default function useUserAuth() {
    const router = useRouter()
    const { setFlashMessage } = useFlashMessage()
    const [authenticated, setAuthenticated] = useState(false)    
    const [user, setUser] = useState("")    

    useEffect(() => {
        let token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            api.defaults.headers['Access-Control-Allow-Origin'] = '*';

            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [authenticated])

    async function authUser(data, user) {
        if (user?.rememberMe) {
            localStorage.setItem('remember-me', true)
            localStorage.setItem('email', JSON.stringify(user?.email))
            localStorage.setItem('password', JSON.stringify(user?.password))
        }else{
            localStorage.removeItem('remember-me')
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }

        localStorage.setItem('token', JSON.stringify(data?.token))
        Cookies.set("user", JSON.stringify(data?.user))
        
        setUser(data?.user)
        router.replace("/dashboard")
    }
    
    async function logout() {
        localStorage.removeItem('token')
        Cookies.remove("user")
        
        setUser("")
        router.replace("/")
    }

    async function login(user) {
        let msgText = 'Usuário logado com sucesso'
        let msgType = 'success'

        try {
            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })
            await authUser(data, user)
            
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    return { login, user, logout }
}

