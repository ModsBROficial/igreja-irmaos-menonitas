import React, { createContext, useState } from "react";
export const ModalSecondContext = createContext({})

const ModalSecondContextProvider = ({ children }) => {
    const [showModalSecond, setShowModalSecond] = useState(false)
    const [dataModalSecond, setDataModalSecond] = useState("")
    const [info, setInfo] = useState("")
    const [infoSecondTwo, setInfoSecondTwo] = useState("")

    const toggleModalSecond = () =>{
        setShowModalSecond(!showModalSecond);
    }

    return (
        <ModalSecondContext.Provider value={{ showModalSecond, toggleModalSecond, dataModalSecond, setDataModalSecond, info, setInfo, infoSecondTwo, setInfoSecondTwo }} >
            {children}
        </ModalSecondContext.Provider>
    )
}

export default ModalSecondContextProvider;
