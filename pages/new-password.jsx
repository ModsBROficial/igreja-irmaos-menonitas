import Logo from "@/components/Logo";
import TitleH1 from "@/components/TitleH1";
import Input from "@/components/InputContainer";
import { useState } from "react";
import Button from "@/components/Button";
import Head from "next/head";
import checkMatchPassword from "@/lib/checkMatchPassword";
import axios from "axios";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import checkKey from "@/lib/checkKey";
import { useRouter } from "next/router";

export default function NewPassword() {
  const [matchPassword, setMatchPassword] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isCreatingNewPassword, setIsCreatingNewPassword] = useState(false)

  const createNewPassword = async () => {
    setIsCreatingNewPassword(true)

    let msgText;
    let msgType = 'success'
    const data = { newPassword, confirmNewPassword }

    try {
      await axios.post(`${api}/${versionApi}/users/new-password?token=${router?.query?.token}&email=${router?.query?.email}`, data).then(response => {
        if (response?.data?.message?.type === "error") {
          msgText = response?.data?.message?.data
          msgType = response?.data?.message?.type
        } else {
          router.replace("/")
          msgText = response?.data?.message?.data
        }
      })
    } catch (error) {
      msgText = error?.response?.data?.message?.data
      msgType = error?.response?.data?.message?.type
    }
    setFlashMessage(msgText, msgType);
    setIsCreatingNewPassword(false)
  }

  return (
    <section onKeyDown={(ev) => checkKey(ev, createNewPassword)} className="bg-secondary h-full w-full overflow-y-hidden flex justify-center items-center">
      <Head>
        <meta property="og:title" content={"Sistema Financeiro - Igreja Irmãos Menonitas - Criar Nova Senha"} />
        <meta property="og:url" content={`https://igrejairmaosmenonitas.vercel.app`} />
        <meta property="og:image" content={`${<Logo cursor="cursor-default" />}`} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:locale" content="pt-BR" />
        <title>Sistema Financeiro - Igreja Irmãos Menonitas - Criar Nova Senha</title>
      </Head>
      <div className="flex min-h-[500px] flex-col w-[300px] mx-auto">
        <div className="flex justify-center">
          <Logo cursor="cursor-default" />
        </div>
        <TitleH1 className="text-center mt-[20px]" text="Criar Nova Senha" />
        <p className="text-center text-sm text-light font-light tracking-wide ">Igreja Irmãos Menonitas</p>
        <Input onKeyUp={() => checkMatchPassword(newPassword, confirmNewPassword, setMatchPassword)} className={"mt-[16px]"} padlock={true} look={true} type="password" value={newPassword} onChange={(ev) => setNewPassword(ev.target.value)} text="Senha" placeholder="Senha" />
        <Input onKeyUp={() => checkMatchPassword(newPassword, confirmNewPassword, setMatchPassword)} className={"mt-[16px]"} padlock={true} look={true} type="password" value={confirmNewPassword} onChange={(ev) => setConfirmNewPassword(ev.target.value)} text="Senha" placeholder="Confirme a senha" />
        {matchPassword ?
          <p className='mt-2 text-danger text-sm md:text-base'>As senhas não conferem.</p>
          :
          ""
        }
        {!matchPassword ? (
          <Button onClick={createNewPassword} text={isCreatingNewPassword ? "Cadastrando..." : "Cadastrar nova senha"} className={`mt-[14px] ${isCreatingNewPassword ? " bg-primary_less" : " bg-primary"}`} />

        ) :
          (
            <Button text="Acessar minha conta" className="mt-[14px] bg-neutral-500 cursor-not-allowed" />
          )}
      </div>
    </section>
  );
}
