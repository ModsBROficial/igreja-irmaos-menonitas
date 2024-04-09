import React from "react";
import { MouseEventHandler } from "react";

interface SearchIconProps {
    className?: string;
    onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}
const SearchIcon: React.FC<SearchIconProps> = ({ className, onClick }) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 text-secondary_less dark:text-placeholder cursor-pointer ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    );
}

export default SearchIcon;
