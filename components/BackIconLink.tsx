import { useRouter } from "next/navigation";
import React from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface BackIconLinkProps {
    path: string;
    className?: string;
}

const BackIconLink: React.FC<BackIconLinkProps> = ({ path, className }) => {
    const router = useRouter()
    
    return (
        <div className={`cursor-pointer ${className}`} onClick={ ()=> router.push(`${path}`) }>
            <ArrowLeftIcon />
        </div>
    );
}

export default BackIconLink;