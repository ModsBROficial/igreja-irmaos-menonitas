import React, { createContext, useState } from "react";
export const ModalContext = createContext({})

const ModalContextProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState("")
    const [saldoEmCaixa, setSaldoEmCaixa] = useState("")
    const [saldoEmBanco, setSaldoEmBanco] = useState("")

    const toggleModal = () =>{
        setShowModal(!showModal);
    }

    return (
        <ModalContext.Provider value={{ showModal, toggleModal, dataModal, setDataModal, saldoEmCaixa, setSaldoEmCaixa, saldoEmBanco, setSaldoEmBanco }} >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider;
