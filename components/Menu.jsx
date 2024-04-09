import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import ActionsIcon from "./icons/ActionsIcon";
import ReportsIcon from "./icons/ReportsIcon";
import CategoryIcon from "./icons/CategoryIcon";
import UserProfileIcon from "./icons/UserProfileIcon";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import Profile from "./Profile";
import Add from "./Add";
import { getCurrentUser } from "@/helpers/getCurrentUser";
import useFlashMessage from "@/hooks/useFlashMessage";
import TransactionsIcon from "./icons/TransactionsIcon";

const Menu = () => {
    const { setFlashMessage } = useFlashMessage()
    const { setDataModal, toggleModal } = useContext(ModalContext)
    const [user, setUser] = useState("")

    useEffect(() => {
        let currentUser = getCurrentUser()
        setUser(currentUser)
    }, [])

    const newAction = () => {
        if (user?.rule?.name === "tesoureiro" || user?.rule?.name === "administrador") {
            toggleModal()
            setDataModal(<Add />)
        } else {
            setFlashMessage("Acesso liberado apenas a tesoureiros", "error")
        }
    }

    return (
        <div className="fixed px-[10px] z-[9] bottom-0 left-0 h-[80px] w-full bg-primary backdrop-blur-[2px] dark:bg-secondary_rgba ">
            <ul className="flex justify-between h-full items-center max-w-[600px] mx-auto">
                <li className="w-[60px] h-[60px] p-3 flex items-center justify-center">
                    <Link className="flex flex-col items-center justify-center" href={"/dashboard"}>
                        <HomeIcon />
                        <span className="text-light text-sm">Início</span>
                    </Link>
                </li>
                <li className="w-[60px] h-[60px] p-3 flex items-center justify-center">
                    <Link className="flex flex-col items-center justify-center" href={"/dashboard/transactions"}>
                        <TransactionsIcon />
                        <span className="text-light text-sm">Gestão</span>
                    </Link>
                </li>
                <li onClick={newAction} className="w-[60px] h-[60px] p-3 flex items-center justify-center border border-light dark:border-0 rounded cursor-pointer">
                    <ActionsIcon />
                </li>
                <li className="w-[60px] h-[60px] p-3 flex items-center justify-center">
                    <Link className="flex flex-col items-center justify-center" href={"/dashboard/reports"}>
                        <ReportsIcon />
                        <span className="text-light text-sm">Relatórios</span>
                    </Link>
                </li>
                <li onClick={() => { toggleModal(), setDataModal(<Profile />) }} className="w-[60px] h-[60px] flex flex-col items-center justify-center cursor-pointer">
                    <UserProfileIcon />
                    <span className="text-light text-sm">Perfil</span>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
