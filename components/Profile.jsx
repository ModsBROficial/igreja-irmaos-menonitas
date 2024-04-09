import { getCurrentUser } from "@/helpers/getCurrentUser"
import { useContext, useEffect, useState } from "react"
import formatName from "@/lib/formatName"
import ButtonLink from "./ButtonLink"
import { ModalContext } from "@/providers/ModalProvider"

const Profile = () => {
    const [user, setUser] = useState("")
    const { toggleModal } = useContext(ModalContext)

    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])

    return (
        <div className="flex flex-col text-sm">
            <h2 className="text-lg font-bold">Meus dados</h2> 
            <h2 className="mt-[30px]">Nome: {formatName(user?.name)}</h2>
            <h2 className="mt-[20px]">Função: {formatName(user?.rule?.name)}</h2>
            <h2 className="mt-[20px]">Email: {user?.email?.includes("@")? user?.email : "Não utilizado"}</h2>
            <h2 className="mt-[20px] mb-[30px]">Celular: {user?.email?.includes("@")? "Não utilizado" : user?.email }</h2>
            <ButtonLink onClick={toggleModal} path="/dashboard/settings" text="Editar minhas informações" className=" bg-primary h-[44px]"/>
        </div>
    );
}
 
export default Profile;