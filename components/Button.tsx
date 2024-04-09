import { MouseEventHandler } from "react";

interface TitleH1Props{
    text: string;
    className?: string;
    icon?: string ;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button:React.FC<TitleH1Props> = ({ text, className, onClick, icon }) => {
    return (
        <button onClick={onClick} className={`flex gap-2 items-center px-2 justify-center text-sm md:text-base h-[44px] rounded text-light ${className}`}>
            {icon && (
                icon
            )}
            {text}
        </button>
    );
}
 
export default Button;