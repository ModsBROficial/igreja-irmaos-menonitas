import ButtonLink from "@/components/ButtonLink";
import Logo from "@/components/Logo";
import TitleH1 from "@/components/TitleH1";
import InputContainer from "@/components/InputContainer";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button";
import Head from "next/head";
import { contextUserAuth } from "@/providers/userAuthProvider";
import checkKey from '@/lib/checkKey'

export default function Home() {
  const { login } = useContext(contextUserAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
    
  const loginUser = async () => {
    setIsLogin(true)
    const data = { email, password, rememberMe }
    await login(data)
    setIsLogin(false)
  }
  
  useEffect(()=>{
    setEmail(JSON.parse(localStorage.getItem("email")))
    setPassword(JSON.parse(localStorage.getItem("password")))
    setRememberMe(localStorage.getItem("remember-me"))
  },[])

  return (
    <section onKeyDown={(ev) => checkKey(ev, loginUser)} className="bg-secondary h-full w-full flex justify-center items-center">
      <Head>
        <meta property="og:title" content={"Sistema Financeiro - Igreja Irmãos Menonitas - Login"} />
        <meta property="og:url" content={`https://igrejairmaosmenonitas.vercel.app`} />
        <meta property="og:image" content={`${<Logo cursor="cursor-default" />}`} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:locale" content="pt-BR" />
        <title>Sistema Financeiro - Igreja Irmãos Menonitas - Login</title>
      </Head>
      <div className="flex min-h-[500px] flex-col w-[300px] mx-auto">
        <div className="flex justify-center">
          <Logo cursor="cursor-default" />
        </div>
        <TitleH1 className="text-center mt-[20px]" text="Sistema Financeiro" />
        <p className="text-center text-sm text-light font-light tracking-wide ">Igreja Irmãos Menonitas</p>
        <InputContainer required={true} className={"mt-[24px]"} user={true} value={email} type="email" onChange={(ev) => setEmail(ev.target.value)} text="Email" placeholder="Email" />
        <InputContainer required={true} className={"mt-[16px]"} padlock={true} look={true} type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} text="Senha" placeholder="Senha" />
        <ButtonLink path="/forgot-password" className="text-sm mt-[16px] underline md:text-xs w-fit ml-auto" text="Esqueci minha senha" />
        {isLogin ? (
          <Button text="Acessando..." className="bg-primary_less mt-[14px]" />
        ) : (
          <Button onClick={loginUser} text="Acessar minha conta" className="bg-primary mt-[14px]" />
        )}

        <div className="flex mt-[14px] md:mt-[10px]">
          <input className="cursor-pointer" type="checkbox" id="password-remember" name="password-remember" value="password-remember" checked={rememberMe ? true : false } onChange={() => setRememberMe(!rememberMe)} />
          <label htmlFor="password-remember" className="cursor-pointer ml-[10px] text-light text-sm md:text-xs">Lembrar email e senha</label>
        </div>
      </div>
    </section>
  );
}
