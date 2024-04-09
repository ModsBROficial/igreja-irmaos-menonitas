import Image from "next/image";
import React, { MouseEventHandler } from "react";
import CloseIcon from "./icons/CloseIcon";

interface CategoryCardProps{
    text?: string;
    img: string;
    className?: string;
    classNameH2?: string;
    id?: string;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
} 

const CategoryCard: React.FC<CategoryCardProps> = ({ text, img, className, onClick, id, classNameH2 }) => {
    return (
        <div id={id} onClick={onClick} className={`relative flex gap-1 items-center justify-center w-[76px] h-[76px] rounded p-2 flex-col transition-all duration-300 ${className} `} >
            <div className="absolute w-full h-full opacity-50">

            </div>
            <Image id={id} width={30} height={30} alt="Image" src={img} />
            {text && (
                <h2 className={`mt-[4px] text-[10px] tracking-wider min-h-[20px] leading-tight text-center text-dark font-bold dark:text-light ${classNameH2}`}>{text}</h2>
            )}
        </div>
    );
}
 
export default CategoryCard;