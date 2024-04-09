import { ModalContext } from "@/providers/ModalProvider";
import React, { useContext } from "react";
import CloseIcon from "./icons/CloseIcon";
import Overlay from "./Overlay";

const Modal = () => {
    const {showModal, dataModal, toggleModal, setDataModal} = useContext(ModalContext)

    return (
        <section className={`flex items-center backdrop-blur-[2px] justify-center bg-black_rgba absolute top-0 left-0 text-light transition-all w-full h-screen ${showModal ? "z-[99] " : "-z-[9] "}`}>
            <Overlay onClick={()=> {toggleModal(), setDataModal()}} />

            <div className="bg-light dark:bg-secondary_less text-secondary dark:text-light rounded shadow-2xl min-h-[300px] w-[90%] max-w-[400px] relative p-[20px]">
                <div onClick={()=> {toggleModal(), setDataModal("")}} className="cursor-pointer w-fit absolute right-[10px] top-[15px]" >
                    <CloseIcon />
                </div>
                {dataModal}
            </div>
        </section>
    );
}
 
export default Modal;
