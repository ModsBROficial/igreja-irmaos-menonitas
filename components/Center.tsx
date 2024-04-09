import React from "react";

interface CenterProps{
    children: React.ReactNode;
}
const Center: React.FC<CenterProps> = ({children}) => {
    return (
        <section className="max-w-[352px] sm:max-w-[520px] md:max-w-[590px] lg:max-w-[740px] mx-auto">
            {children}
        </section>
    );
}
 
export default Center;