import React, { MouseEventHandler } from "react";
import PlusIcon from "./icons/PlusIcon";

interface CategoryCardButtonProps{
    onClick: MouseEventHandler<HTMLDivElement>;
}

const CategoryCardButton: React.FC<CategoryCardButtonProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex cursor-pointer transition duration-300 justify-center items-center w-[76px] h-[76px] rounded p-2 flex-col bg-gray-100 dark:bg-secondary_less hover:bg-gray-200 dark:hover:bg-gray-600 sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] " >
            <PlusIcon />
            <div className="leading-tight font-bold text-secondary dark:text-light">
                <span className="text-[10px]">criar uma</span><br />
                <h2 className="text-[10px] text-center">categoria</h2>
            </div>
        </div>
    );
}
 
export default CategoryCardButton;