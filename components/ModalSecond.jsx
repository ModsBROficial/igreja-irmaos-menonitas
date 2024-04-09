import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import React, { useContext } from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import Overlay from "./Overlay";

const ModalSecond = () => {
    const {showModalSecond, dataModalSecond, toggleModalSecond, setDataModalSecond} = useContext(ModalSecondContext)

    return (
        <section className={`flex overflow-hidden items-center justify-center absolute top-0 left-0 text-light transition-all duration-300 w-full h-screen ${showModalSecond ? "z-[999] scale-100 " : "-z-[9] scale-0 "}`}>
            <Overlay onClick={()=> {toggleModalSecond(), setDataModalSecond()}} />
            <div className="bg-light dark:bg-secondary_less text-secondary dark:text-light rounded shadow-2xl h-full w-full max-w-[800px] md:max-h-[550px] mx-auto relative p-[20px]">
                <div onClick={()=> {toggleModalSecond(), setDataModalSecond()}} className="cursor-pointer w-fit absolute left-[10px] top-[15px]" >
                    <ArrowLeftIcon />
                </div>
                <div className="flex justify-center">
                    {dataModalSecond}
                </div>
            </div>
        </section>
    );
}
 
export default ModalSecond;
