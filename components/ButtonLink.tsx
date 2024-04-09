import Link from "next/link";
import { MouseEventHandler } from "react";

interface ButtonLinkProps{
    text: string;
    path: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined,
}

const ButtonLink:React.FC<ButtonLinkProps> = ({ text, path, className, onClick }) => {
    return (
        <Link onClick={onClick} href={path} className={`flex items-center justify-center text-sm md:text-base rounded text-light ${className}`}>
            {text}
        </Link>
    );
}
 
export default ButtonLink;