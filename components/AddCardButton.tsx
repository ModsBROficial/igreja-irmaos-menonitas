import React, { MouseEventHandler } from "react";
import PlusIcon from "./icons/PlusIcon";

interface AddCardButtonProps{
    onClick: MouseEventHandler<HTMLDivElement>;
    text: string;
    icon: string;
    className: string;
    classNameH2: string;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick, text, icon, className, classNameH2 }) => {
    return (
        <div onClick={onClick} className={`flex cursor-pointer justify-center items-center w-[76px] h-[76px] rounded p-2 flex-col sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] ${className}`}>
            {icon}
            <div className={`leading-tight text-center text-light dark:text-light ${classNameH2}`}>
                <span className="text-[10px] md:text-[11px] font-bold">adicionar</span><br />
                <h2 className="text-[10px] md:text-[11px] font-bold text-center">{text}</h2>
            </div>
        </div>
    );
}
 
export default AddCardButton;