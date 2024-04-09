import React, { createContext, useState } from "react";
export const ModalThirdContext = createContext({})

const ModalThirdContextProvider = ({ children }) => {
    const [showModalThird, setShowModalThird] = useState(false)
    const [dataModalThird, setDataModalThird] = useState("")
    const [infoThird, setInfoThird] = useState("")

    const toggleModalThird = () =>{
        setShowModalThird(!showModalThird);
    }

    return (
        <ModalThirdContext.Provider value={{ showModalThird, toggleModalThird, dataModalThird, setDataModalThird, infoThird, setInfoThird }} >
            {children}
        </ModalThirdContext.Provider>
    )
}

export default ModalThirdContextProvider;
