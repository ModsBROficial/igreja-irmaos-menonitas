import React, { useContext, useEffect, useState } from "react";
import HamburgerIcon from "./icons/HamburgerIcon";
import formatName from "@/lib/formatName"
import { getCurrentUser } from "@/helpers/getCurrentUser"
import { NavContext } from "@/providers/NavbarProvider";

const Header = () => {
    const { toggleMenuMobile } = useContext(NavContext)
    const [user, setUser] = useState("")

    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])
    
    return (
        <div className="fixed z-[9] flex items-center justify-between h-[80px] w-full left-0 top-0  bg-primary backdrop-blur-[2px] dark:bg-secondary_rgba px-[15px]">
            <div className="cursor-pointer" onClick={toggleMenuMobile}>
                <HamburgerIcon />
            </div>
            <span className="text-light text-sm">{formatName(user?.name)}</span>
        </div>
    );
}
 
export default Header;