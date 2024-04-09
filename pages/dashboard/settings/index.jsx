import { mongooseConnect } from "@/lib/mongoose";
import { Rule } from "@/models/Rule";
import { getCurrentUser } from "@/helpers/getCurrentUser"
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import { useState } from "react";
import TitleH3 from "@/components/TitleH3";
import InputContainerModal from "@/components/InputContainerModal";
import Button from "@/components//Button";
import axios from "axios";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import checkMatchPassword from "@/lib/checkMatchPassword";
import formatName from "@/lib/formatName";

const Settings = () => {
  const { setFlashMessage } = useFlashMessage()
  const router = useRouter()
  const [user, setUser] = useState("")

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState("")

  const [matchPassword, setMatchPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')  
  
  const [isSaving, setIsSaving] = useState("")

  useEffect(() => {
    let currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
  }, [user])

  const updateUser = async () => {
    setIsSaving(true)
    let msgText;
    let msgType = 'success'
    
    if (newPassword && !confirmNewPassword || confirmNewPassword && !newPassword ) {
      msgText = "Por favor confirme a sua senha ";
      msgType = "error"
      setIsSaving(false)
      setFlashMessage(msgText, msgType)
      return
    }

    let data = { name, email, password: newPassword }

    try {
        await axios.patch(`${api}/${versionApi}/users/id/${user?._id}?hash=${user?.password}`, data).then(response => {
            if (response?.data?.message?.type === "error") {
                msgText = response?.data?.message?.data
                msgType = response?.data?.message?.type
            } else {
                msgText = response?.data?.message?.data
                localStorage.removeItem('remember-me')
                localStorage.removeItem('email')
                localStorage.removeItem('password')
                router.replace("/")
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
    <Layout>
      <Title text="Configurações" className="mb-[24px]" />
      <div className="flex flex-col text-sm max-w-[350px] mx-auto">
        <TitleH3 text="Nome" />
        <InputContainerModal required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"} classNameInput="bg-gray-100 dark:bg-secondary" value={formatName(name)} onChange={(ev) => setName(ev.target.value)} placeholder="Nome" />

        <TitleH3 text="Email ou celular" />
        <InputContainerModal required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"} classNameInput="bg-gray-100 dark:bg-secondary" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email ou celular" />

        <TitleH3 text="Senha" />
        <InputContainerModal onKeyUp={() => checkMatchPassword(newPassword, confirmNewPassword, setMatchPassword)} look={true} required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"}  classNameInput="bg-gray-100 dark:bg-secondary" value={newPassword} onChange={(ev) => setNewPassword(ev.target.value)} placeholder="Senha" />
        <TitleH3 text="Confirmação de senha" />
        <InputContainerModal onKeyUp={() => checkMatchPassword(newPassword, confirmNewPassword, setMatchPassword)} look={true} required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"}  classNameInput="bg-gray-100 dark:bg-secondary" value={confirmNewPassword} onChange={(ev) => setConfirmNewPassword(ev.target.value)} placeholder="Senha" />

        {matchPassword ?
          <p className='mt-2 text-danger text-sm md:text-base'>As senhas não conferem.</p>
          :
          ""
        }
        {!matchPassword ? (
          <Button text={isSaving ? "Atualizando..." :"Atualizar meus dados" } onClick={updateUser} className="bg-primary mt-[14px]" />

        ) :
          (
            <Button text="Atualizar meus dados" className="mt-[14px] bg-neutral-500 cursor-not-allowed" />
          )}
        
      </div>
    </Layout>
  );
}

export default Settings;

export async function getServerSideProps(req) {
  await mongooseConnect()

  const rulesDb = await Rule.find({})

  return {
    props: {
      rulesDb: JSON.parse(JSON.stringify(rulesDb)),
    }
  }
}