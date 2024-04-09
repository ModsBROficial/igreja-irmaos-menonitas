import TitleH3 from "./TitleH3";
import Button from "./Button";
import PencilIcon from "./icons/PencilIcon";
import TrashIcon from "./icons/TrashIcon";
import EditTransaction from "@/components/EditTransaction";
import { useContext, useEffect, useState } from "react";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import axios from "axios";
import { useRouter } from "next/router";
import { ModalThirdContext } from "@/providers/ModalThirdProvider";
import { ModalContext } from "@/providers/ModalProvider";
import { getCurrentUser } from "@/helpers/getCurrentUser";
import ToggleThemeOnIcon from "./icons/ToggleThemeOnIcon";
import ToggleThemeOffIcon from "./icons/ToggleThemeOffIcon";

const InfoTransaction = ({ transaction }) => {
    const { setFlashMessage } = useFlashMessage()
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeletingAll, setIsDeletingAll] = useState(false)
    const router = useRouter()
    const { toggleModalThird, setDataModalThird, setInfoThird } = useContext(ModalThirdContext)
    const { toggleModal, setDataModal, saldoEmCaixa } = useContext(ModalContext)
    const [user, setUser] = useState("")
    const [paid, setPaid] = useState(false)
    const [saldo, setSaldo] = useState("")
    
    useEffect(() => {
        setInfoThird("")
        let currentUser = getCurrentUser()
        setUser(currentUser)
        setPaid(transaction?.paid)
        setSaldo(saldoEmCaixa)
    }, [])

    const checkValueInBank = () => {
        
        if (transaction.inInstallmentsQtt > 0 && !transaction.paid) {
            if(transaction.inInstallmentValue > saldoEmCaixa){
                setFlashMessage("Verifique o saldo na pagina inicial, saldo insuficiente", "error")
                return
            }
            setPaid(!paid),
            paidTransaction(!paid)
        }

        if (transaction.accountValue > saldoEmCaixa && !transaction.paid) {
            setFlashMessage("Verifique o saldo na pagina inicial, saldo insuficiente", "error")
            return
        }
        setPaid(!paid),
        paidTransaction(!paid)
    }


    const paidTransaction = async (paid) => {
        let msgText;
        let msgType = 'success'
        const data = { type: transaction?.type, paid }

        try {
            await axios.patch(`${api}/${versionApi}/transactions/id/${transaction?._id}?userId=${user?._id}`, data).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    setDataModal("")
                    setInfoThird("")
                    router.push("/dashboard")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
    }


    const deleteTransaction = async (deleteAll) => {
        if (deleteAll === true) {
            setIsDeletingAll(true)
        } else {
            deleteAll = false
            setIsDeleting(true)
        }

        let msgText;
        let msgType = 'success'

        try {
            await axios.delete(`${api}/${versionApi}/transactions/id/${transaction?._id}?userId=${user?._id}&&deleteAll=${deleteAll}&&hash=${transaction?.hash}`).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    router.push("/dashboard")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsDeleting(false)
        setIsDeletingAll(false)
    }

    return (
        <div className="flex flex-col text-sm">
            <TitleH3 text="Mais opções" />
            {transaction.type === "despesa" && (
                <div className="flex flex-col items-start mt-[30px]">
                    <div className={`flex items-center w-full ml-[10px]`}>
                        <div className="w-[100px]">
                            {paid ?
                                (
                                    <TitleH3 text="Já paguei" />
                                ) : (
                                    <TitleH3 text="Não paguei" />
                                )}
                        </div>
                        <button value={paid} onClick={checkValueInBank} >{paid ? <ToggleThemeOnIcon /> : <ToggleThemeOffIcon />}</button>
                    </div>
                    <Button icon={<PencilIcon />} onClick={() => { setDataModalThird(<EditTransaction transaction={transaction} saldoEmCaixa={saldoEmCaixa} />), toggleModalThird() }} text={`Editar movimentação`} className={"mt-[24px] text-secondary dark:text-light "} />
                    <Button icon={<TrashIcon />} onClick={deleteTransaction} text={`${isDeleting ? "Excluindo..." : "Excluir esta movimentação"}`} className={"mt-[10px] text-red-400 "} />
                    {transaction.inInstallmentsQtt > 1 && (
                        <Button icon={<TrashIcon />} onClick={() => deleteTransaction(true)} text={`${isDeletingAll ? "Excluindo..." : "Excluir todas"}`} className={"mt-[10px] text-red-400 "} />
                    )}
                    {transaction.recurrent && (
                        <Button icon={<TrashIcon />} onClick={() => deleteTransaction(true)} text={`${isDeletingAll ? "Excluindo..." : "Excluir todas"}`} className={"mt-[10px] text-red-400 "} />
                    )}
                </div>
            )}

            {transaction.type === "receita" && (
                <div className="flex flex-col items-start mt-[30px]">
                <div className={`flex items-center w-full ml-[10px]`}>
                    <div className="w-[100px]">
                        {paid ?
                            (
                                <TitleH3 text="Já recebi" />
                            ) : (
                                <TitleH3 text="Não recebi" />
                            )}
                    </div>
                    <button value={paid} onClick={() => { setPaid(!paid), paidTransaction(!paid) }} >{paid ? <ToggleThemeOnIcon /> : <ToggleThemeOffIcon />}</button>
                </div>
                <Button icon={<PencilIcon />} onClick={() => { setDataModalThird(<EditTransaction transaction={transaction} />), toggleModalThird() }} text={`Editar movimentação`} className={"mt-[24px] text-secondary dark:text-light "} />
                <Button icon={<TrashIcon />} onClick={deleteTransaction} text={`${isDeleting ? "Excluindo..." : "Excluir esta movimentação"}`} className={"mt-[10px] text-red-400 "} />
                {transaction.inInstallmentsQtt > 1 && (
                    <Button icon={<TrashIcon />} onClick={() => deleteTransaction(true)} text={`${isDeletingAll ? "Excluindo..." : "Excluir todas"}`} className={"mt-[10px] text-red-400 "} />
                )}
                {transaction.recurrent && (
                    <Button icon={<TrashIcon />} onClick={() => deleteTransaction(true)} text={`${isDeletingAll ? "Excluindo..." : "Excluir todas"}`} className={"mt-[10px] text-red-400 "} />
                )}
            </div>
            )}

            {transaction.type === "rendimento" && (
                <div className="flex flex-col items-start mt-[30px]">
                    <Button icon={<PencilIcon />} onClick={() => { setDataModalThird(<EditTransaction transaction={transaction} />), toggleModalThird() }} text={`Editar movimentação`} className={"mt-[24px] text-secondary dark:text-light "} />
                    <Button icon={<TrashIcon />} onClick={deleteTransaction} text={`${isDeleting ? "Excluindo..." : "Excluir esta movimentação"}`} className={"mt-[10px] text-red-400 "} />
                </div>
            )}

            {transaction.type === "transferencia" && (
                <div className="flex flex-col items-start mt-[30px]">
                    <Button icon={<PencilIcon />} onClick={() => { setDataModalThird(<EditTransaction transaction={transaction} />), toggleModalThird() }} text={`Editar movimentação`} className={"mt-[24px] text-secondary dark:text-light "} />
                    <Button icon={<TrashIcon />} onClick={deleteTransaction} text={`${isDeleting ? "Excluindo..." : "Excluir esta movimentação"}`} className={"mt-[10px] text-red-400 "} />
                </div>
            )}

        </div>
    );
}

export default InfoTransaction;