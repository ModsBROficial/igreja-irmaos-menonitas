import { NavContext } from "@/providers/NavbarProvider";
import { useContext, useEffect, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import Logo from "./Logo";
import Link from "next/link";
import { getCurrentUser } from "@/helpers/getCurrentUser";
import formatName from "@/lib/formatName";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import DocsIcon from "./icons/DocsIcon";
import SettingsIcon from "./icons/SettingsIcon";
import UsersIcon from "./icons/UsersIcon";
import TransactionsIcon from "./icons/TransactionsIcon";
import LogIcon from "./icons/LogIcon";
import Overlay from "./Overlay";
import { contextUserAuth } from "@/providers/userAuthProvider";
import LogoColorful from "./LogoColorful";
import ToggleThemeOffIcon from "@/components/icons/ToggleThemeOffIcon"
import ToggleThemeOnIcon from "@/components/icons/ToggleThemeOnIcon"
import Sun from "./icons/Sun";
import Moon from "./icons/Moon";
import LogoutIcon from "./icons/LogOutIcon";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import CategoryIcon from "./icons/CategoryIcon";

const MenuMobile = () => {
    const { logout, themeUser, toggleTheme } = useContext(contextUserAuth)
    const { showMenuMobile, toggleMenuMobile } = useContext(NavContext)
    const [user, setUser] = useState("")

    useEffect(() => {
        let currentUser = getCurrentUser()
        setUser(currentUser)
    }, [])

    const logoutUser = async () => {
        await logout()
        let message = " deslogou do sistema"
        const data = { message }
        await axios.post(`${api}/${versionApi}/log?userId=${user?._id}`, data)
    }

    return (
        <div className={`w-screen h-screen fixed top-0 z-[99] transition-all duration-500 ${showMenuMobile ? "left-[0%] " : "-left-[100%]"}`}>
            <Overlay onClick={toggleMenuMobile} />
            <div className={`absolute h-full py-[30px] justify-between backdrop-blur-[2px] flex flex-col w-[350px] bg-white_rgba shadow-lg dark:bg-gray_rgba left-0`}>
                <menu>
                    <div className="flex px-[30px] w-full gap-2">
                        {themeUser ? (
                            <Logo height={39} width={27} onclick={toggleMenuMobile} path="/dashboard" />
                        ) : (
                            <LogoColorful height={39} width={27} onclick={toggleMenuMobile} path="/dashboard" />
                        )}
                        <div>
                            <Link onClick={toggleMenuMobile} href={'/dashboard'}>
                                <h2 className="text-secondary dark:text-light font-bold text-xl">Sistema Financeiro</h2>
                                <p className="text-secondary dark:text-light font-normal text-[14px] -mt-1">Igreja Irmãos Menonitas</p>
                            </Link>
                        </div>
                        <div className="h-fit w-fit absolute top-[20px] right-[20px] cursor-pointer" onClick={toggleMenuMobile} >
                            <CloseIcon />
                        </div>
                    </div>

                    <div className="mt-[30px] w-full">
                        <ul className="flex flex-col justify-center">
                            {user?.rule?.name === "membro" ? (
                                ""
                            ) : (
                                <li onClick={toggleMenuMobile} className="border-b border-mygray_more">
                                    <Link className="flex p-3 h-full justify-between items-center" href={"/dashboard/documents"}>
                                        <div className="flex items-center gap-2">
                                            <DocsIcon />
                                            Documentos
                                        </div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </Link>
                                </li>
                            )}
                            <li onClick={toggleMenuMobile} className="border-b border-mygray_more">
                                <Link className="flex p-3 justify-between items-center" href={"/dashboard/categories"}>
                                    <div className="flex items-center gap-2">
                                        <CategoryIcon className={themeUser ? "white": "#171C22" } />
                                        Categorias
                                    </div>
                                    <ChevronRightIcon className="w-4 h-4" />
                                </Link>
                            </li>
                            {user?.rule?.name === "administrador" && (
                                <li onClick={toggleMenuMobile} className="border-b border-mygray_more">
                                    <Link className="flex p-3 justify-between items-center" href={"/dashboard/manage-accounts"}>
                                        <div className="flex items-center gap-2">
                                            <UsersIcon />
                                            Gerenciar contas
                                        </div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </Link>
                                </li>
                            )}
                            {user?.rule?.name === "administrador" ? (
                                <li onClick={toggleMenuMobile} className="border-b border-mygray_more">
                                    <Link className="flex p-3 justify-between items-center" href={"/dashboard/system-log"}>
                                        <div className="flex items-center gap-2">
                                            <LogIcon />
                                            Log do sistema
                                        </div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </Link>
                                </li>
                            ) : user?.rule?.name === "presidente" ? (
                                <li onClick={toggleMenuMobile} className="border-b border-mygray_more">
                                    <Link className="flex p-3 justify-between items-center" href={"/dashboard/system-log"}>
                                        <div className="flex items-center gap-2">
                                            <LogIcon />
                                            Log do sistema
                                        </div>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </Link>
                                </li>
                            ) :
                                ("")
                            }
                            <li onClick={toggleMenuMobile} className="border-b border-mygray_more">
                                <Link className="flex p-3 justify-between items-center" href={"/dashboard/settings"}>
                                    <div className="flex items-center gap-2">
                                        <SettingsIcon />
                                        Configurações
                                    </div>
                                    <ChevronRightIcon className="w-4 h-4" />
                                </Link>
                            </li>
                            <div className="flex m-[15px] gap-[13px] items-center">
                                <h2>{themeUser ? <Sun /> : <Moon />}</h2>
                                <button onClick={() => toggleTheme()}>{themeUser ? <ToggleThemeOnIcon /> : <ToggleThemeOffIcon /> }</button>
                            </div>
                        </ul>
                    </div>
                </menu>

                <div className="flex justify-center flex-col">
                    <ul className="flex flex-col justify-center text-center">
                        <li className="py-1 text-[14px]">
                            <span className="font-normal dark:font-thin">Logado como </span><span className="">{formatName(user?.name)}</span>
                        </li>
                        <li onClick={() => { toggleMenuMobile(), logoutUser() }} className="py-1 flex gap-[6px] items-center w-fit mx-auto cursor-pointer">
                            <LogoutIcon />
                            <span>Sair</span>
                        </li>
                        <li className="text-center">
                            <span className="text-[12px] ">V.1.0</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MenuMobile;