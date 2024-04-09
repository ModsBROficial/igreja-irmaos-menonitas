import React, { KeyboardEventHandler, useContext, useEffect } from "react";
import Menu from "./Menu";
import Header from "./Header";
import Modal from "@/components/Modal";
import ModalSecond from "@/components/ModalSecond";
import ModalThird from "@/components/ModalThird";
import Center from "@/components/Center";
import MenuMobile from "@/components/MenuMobile";
import { contextUserAuth } from "@/providers/userAuthProvider";

interface LayoutProps{
    children: React.ReactNode;
    onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
}

const Layout: React.FC<LayoutProps> = ({children, onKeyDown}) => {
    const {checkTheme} = useContext(contextUserAuth)

    useEffect(()=>{
        checkTheme()
    },[])

    return (
        <div onKeyDown={onKeyDown} className="h-screen w-full bg-light dark:bg-secondary text-secondary dark:text-light ">
            <MenuMobile />
            <ModalThird />
            <ModalSecond />
            <Modal />
            <Header />
            <main className="px-[14px] py-[110px] w-full h-full overflow-y-scroll">
                <Center>
                    {children}
                </Center>
            </main>
            <Menu />
        </div>
    );
}
 
export default Layout;