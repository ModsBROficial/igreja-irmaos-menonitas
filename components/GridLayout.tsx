import React from "react";

interface GridLayoutProps{
    children: React.ReactNode;
    className?: string;
} 
const GridLayout: React.FC<GridLayoutProps> = ({ children, className }) => {
    return (
        <section className={`grid w-fit mx-auto grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-[16px] text-light ${className}`}>
            {children}
        </section>
    );
}
 
export default GridLayout;