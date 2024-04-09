import SearchIcon from "./icons/SearchIcon";
import React, { KeyboardEventHandler } from "react";

interface SearchContainerProps{
    placeholder: string;
    value: string;
    className?: string | undefined;
    onClick: () => void;
    onchange: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
} 

const SearchContainer: React.FC<SearchContainerProps> = ({ placeholder, className, onClick, value, onchange, onKeyDown }) => {
    return (
        <div onKeyDown={onKeyDown} className={`flex justify-between rounded w-full h-[44px] items-center bg-gray-100 dark:bg-secondary_less border px-[10px] border-gray-200 dark:border-gray-500 ${className}` }>
            <input value={value} onChange={onchange} className="bg-transparent text-secondary dark:text-light w-full placeholder:text-placeholder text-sm" type="text" placeholder={placeholder} />
            <SearchIcon onClick={onClick} />
        </div>
    );
}
 
export default SearchContainer;