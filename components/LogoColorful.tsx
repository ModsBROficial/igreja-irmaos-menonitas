import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
const COLOR_FUL_LOGO = "/images/colorful-logo.png"

interface LogoColorfulProps{
    path?: string;
    cursor?: string;
    height?: number;
    width?: number;
    onclick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const LogoColorful:React.FC<LogoColorfulProps> = ({ path, cursor, onclick, height, width }) => {
    return (
        <Link onClick={onclick} href={path ? path : "" } className={`${cursor ? cursor : "cursor-pointer "}`}>
            <Image height={`${height ? height: 142}`} width={`${width ? width: 98}`} alt="" src={COLOR_FUL_LOGO} />
        </Link>
    );
}
 
export default LogoColorful;