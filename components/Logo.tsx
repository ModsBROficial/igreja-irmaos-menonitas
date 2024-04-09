import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
const LOGO = "/images/white-logo.png"

interface LogoProps{
    path?: string;
    cursor?: string;
    height?: number;
    width?: number;
    onclick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const Logo:React.FC<LogoProps> = ({ path, cursor, onclick, height, width }) => {
    return (
        <Link onClick={onclick} href={path ? path : "" } className={`${cursor ? cursor : "cursor-pointer "}`}>
            <Image height={`${height ? height: 142}`} width={`${width ? width: 98}`} alt="" src={LOGO} />
        </Link>
    );
}
 
export default Logo;