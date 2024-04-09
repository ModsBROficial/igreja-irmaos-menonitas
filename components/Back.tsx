import { useRouter } from "next/navigation";
import React from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

const Back = () => {
    const router = useRouter()
    
    return (
        <div className="cursor-pointer" onClick={()=> router.back()} >
            <ArrowLeftIcon />
        </div>
    );
}

export default Back;
