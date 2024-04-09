import { useContext, useEffect, useState } from "react";
import TitleH3 from "./TitleH3";
import InputContainerModal from "@/components/InputContainerModal";
import Button from "./Button";
import SelectContainer from "./SelectContainer";
import axios from "axios";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import { useRouter } from "next/router";
import TitleH2 from "./TitleH2";
import { ModalContext } from "@/providers/ModalProvider";
import { getCurrentUser } from "@/helpers/getCurrentUser";

const NewUser = ({ rules }) => {
    const { setFlashMessage } = useFlashMessage()
    const { toggleModal, setDataModal } = useContext(ModalContext)
    const router = useRouter()
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rule, setRule] = useState("")
    const [isSaving, setIsSaving] = useState("")
    
    const [user, setUser] = useState("")

    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])

    const saveNewUser = async () => {
        setIsSaving(true)
        let msgText;
        let msgType = 'success'
        const data = { name, email, password, rule }

        try {
            await axios.post(`${api}/${versionApi}/users/signup?userId=${user?._id}`, data).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    setDataModal("")
                    router.push("/dashboard/manage-accounts")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsSaving(false)
    }

    return (
        <div className="flex flex-col text-sm">
            <TitleH2 text="Criar Novo usuário" className="mb-[24px]" />

            <TitleH3 text="Nome" />
            <InputContainerModal required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"}  classNameInput="bg-gray-100 dark:bg-secondary" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Nome" />
                        
            <TitleH3 text="Email" />
            <InputContainerModal required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"}  classNameInput="bg-gray-100 dark:bg-secondary" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" />
        
            <TitleH3 text="Senha" />
            <InputContainerModal look={true} required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"}  classNameInput="bg-gray-100 dark:bg-secondary" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Senha" />
        
            <TitleH3 className="mb-[5px]" text="Função" />
            <SelectContainer required={true} data={rules} value={rule} onchange={(ev)=> setRule(ev.target.value)} placeholder="Selecione a função" />

            <Button onClick={saveNewUser} text={`${isSaving ? "Cadastrando..." : "Cadastrar"}`} className={`mt-[24px] ${isSaving ? "bg-neutral-500" : "bg-primary"}`} />
        </div>
    );
}
 
export default NewUser;

