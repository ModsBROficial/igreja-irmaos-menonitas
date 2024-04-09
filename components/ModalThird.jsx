import { ModalThirdContext } from "@/providers/ModalThirdProvider";
import React, { useContext } from "react";
import CloseIcon from "./icons/CloseIcon";
import Overlay from "./Overlay";

const ModalThird = () => {
    const {showModalThird, dataModalThird, setDataModalThird, toggleModalThird} = useContext(ModalThirdContext)

    return (
        <section className={`flex items-center justify-center absolute top-0 left-0 text-light transition-all w-full h-screen ${showModalThird ? "z-[999] " : "-z-[9] "}`}>
            <Overlay onClick={()=> {toggleModalThird(), setDataModalThird("")}} />

            <div className="bg-light dark:bg-secondary_less text-secondary dark:text-light rounded shadow-2xl min-h-[300px] w-[90%] max-w-[400px] relative p-[20px]">
                <div onClick={()=> {toggleModalThird(), setDataModalThird("")}} className="cursor-pointer w-fit absolute right-[10px] top-[15px]" >
                    <CloseIcon />
                </div>
                {dataModalThird}
            </div>
        </section>
    );
}
 
export default ModalThird;
