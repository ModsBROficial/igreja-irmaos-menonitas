import { MouseEventHandler } from "react";

interface ChevronDownIconProps {
    className?: string;
    onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ className, onClick }) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 text-secondary dark:text-light ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

export default ChevronDownIcon;
