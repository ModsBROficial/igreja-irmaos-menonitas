import { useContext, useEffect, useState } from "react";
import TitleH2 from "./TitleH2";
import { ModalContext } from "@/providers/ModalProvider";
import Button from "./Button";
import useFlashMessage from "@/hooks/useFlashMessage";
import { useRouter } from "next/router";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import { getCurrentUser } from "@/helpers/getCurrentUser";

const WarnMessage = ({ item, path, back }) => {
    const { setFlashMessage } = useFlashMessage()
    const { toggleModal, setDataModal } = useContext(ModalContext)
    const router = useRouter()

    const [isRemoving, setIsRemoving] = useState(false)

    const [user, setUser] = useState("")

    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])

    const remove = async () => {
        setIsRemoving(true)
        let msgText;
        let msgType = 'success'

        try {
            await axios.delete(`${api}/${versionApi}/${path}?userId=${user?._id}`).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    setDataModal("")
                    router.push(`/dashboard/${back}`)
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsRemoving(false)
    }

    return (
        <div className="flex items-center flex-col justify-center h-[260px]">
            <TitleH2 text="Tem certeza?" />
            <p className="my-[30px]">Você quer realmente excluir &quot;<span className="font-bold">{item?.name}</span>&ldquo;?</p>
            <div className="flex gap-[20px]">
                <Button onClick={toggleModal} text={"Cancelar"} className="bg-secondary hover:scale-105 transition-all gap-[2px] h-[40px] w-[120px]" />
                <Button onClick={remove} text={`${isRemoving ? "Excluindo...": "Sim, Excluir" }`} className="bg-primary hover:scale-105 transition-all  gap-[2px] h-[40px] w-[120px]" />
            </div>
        </div>
    );
}
 
export default WarnMessage;