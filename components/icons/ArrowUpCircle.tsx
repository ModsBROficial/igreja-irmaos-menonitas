import { MouseEventHandler } from "react";

interface ArrowUpCircleProps {
    className?: string;
    onClick?: MouseEventHandler<SVGSVGElement> | undefined;
}

const ArrowUpCircle: React.FC<ArrowUpCircleProps> = ({ className, onClick }) => {
    return (
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 text-placeholder dark:text-light ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

export default ArrowUpCircle;