import { useContext, useEffect, useState } from "react";
import TitleH3 from "./TitleH3";
import UploadFiles from "./UploadFiles";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import Image from "next/image";
import AllCategories from "./AllCategories";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import ToggleThemeOnIcon from "./icons/ToggleThemeOnIcon";
import ToggleThemeOffIcon from "./icons/ToggleThemeOffIcon";
import Button from "./Button";
import InInstallmentsPage from "./InInstallmentsPage";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import useFlashMessage from "@/hooks/useFlashMessage";
import { ModalThirdContext } from "@/providers/ModalThirdProvider";
import { ModalContext } from "@/providers/ModalProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import ptBR from 'date-fns/locale/pt-BR';
import { getCurrentUser } from "@/helpers/getCurrentUser";
import formatLocalCurrency from "@/lib/formatLocalCurrency";
import { useRouter } from "next/router";

const InfoAdd = ({ valueCalc, type }) => {
    const { setFlashMessage } = useFlashMessage()
    const { setDataModalSecond, toggleModalSecond, info, setInfo, infoSecondTwo, setInfoSecondTwo } = useContext(ModalSecondContext)
    const { setDataModalThird, toggleModalThird } = useContext(ModalThirdContext)
    const { toggleModal, saldoEmCaixa, saldoEmBanco } = useContext(ModalContext)
    const router = useRouter()

    const accountValue = valueCalc?.join("");
    const [startDate, setStartDate] = useState(new Date());
    const [doc, setDoc] = useState([])

    const [inInstallmentsQtt, setInInstallmentsQtt] = useState(0)

    const [inInstallments, setInInstallments] = useState(false)

    const [recurrent, setRecurrent] = useState(false)
    const [recurrentType, setRecurrentType] = useState("annually")

    const [paid, setPaid] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    const [user, setUser] = useState("")

    useEffect(() => {
        let currentUser = getCurrentUser()
        setUser(currentUser)
        setInInstallmentsQtt(0)
    }, [])

    const saveTransaction = async () => {
        setIsSaving(true)

        let msgText;
        let msgType = 'success'
        let name;
        let icon;
        let name_two;
        let icon_two;

        if (info) {
            name = info?.childNodes[2]?.innerText;
            icon = info?.childNodes[1]?.id
        }

        if (infoSecondTwo) {
            name_two = infoSecondTwo?.childNodes[2]?.innerText;
            icon_two = infoSecondTwo?.childNodes[1]?.id
        }

        const data = { type, name, name_two, icon, icon_two, accountValue, date: startDate, doc, inInstallments, recurrent, inInstallmentsQtt, paid, recurrentType }
        
        if(data.type === "Transferencia"){

            if (data.name_two === data.name ) {
                setIsSaving(false)
                setFlashMessage("As contas não podem ser iguais", "error")
                return
            }

            if (!data.name_two) {
                setIsSaving(false)
                setFlashMessage("Insira a conta de destino", "error")
                return
            }

            if (data.name === "Igreja") {
                let value = parseInt(accountValue)
                if (value > saldoEmCaixa) {
                    setIsSaving(false)
                    setFlashMessage(`Valor disponível em caixa é de R$ ${formatLocalCurrency(saldoEmCaixa)}`, "error")
                    return
                }
            }

            if (data.name === "Banco") {
                let value = parseInt(accountValue)
                if (value > saldoEmBanco) {
                    setIsSaving(false)
                    setFlashMessage(`Valor disponível no banco é de R$ ${formatLocalCurrency(saldoEmBanco)}`, "error")
                    return
                }
            }    
        }

        if(paid){
            let value = parseInt(accountValue)

            if (inInstallmentsQtt > 0) {
                if((value / inInstallmentsQtt) > saldoEmCaixa){
                    setIsSaving(false)
                    setFlashMessage("Verifique o saldo na pagina inicial, saldo insuficiente", "error")
                    return
                }
            }
            if (!inInstallments && value > saldoEmCaixa) {
                setIsSaving(false)
                setFlashMessage("Verifique o saldo na pagina inicial, saldo insuficiente", "error")
                return
            }
        }

        try {
            await axios.post(`${api}/${versionApi}/transactions?userId=${user?._id}`, data).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    setDataModalThird("")
                    setInfo("")
                    setInfoSecondTwo("")
                    toggleModalThird()
                    toggleModal()
                    router.push("/dashboard")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsSaving(false)
    }

    const MyContainerDate = ({ children }) => {
        return (
            <div className="absolute text-sm top-0 -left-5 px-[10px] bg-gray-100 border-[4px] rounded border-gray-200 " >
                {children}
            </div>
        );
    };

    return (
        <div>
            {type === "Despesa" && (
                <>
                    <TitleH3 text="Nome por categoria" className="my-[5px]" />
                    <div onClick={() => { toggleModalSecond(), setDataModalSecond(<AllCategories type={type} />) }} className="w-full text-mygray_more dark:text-mygray_more cursor-pointer px-[10px] flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[44px]">
                        {info ?
                            (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center  gap-4">
                                        <Image id={info} width={30} height={30} alt="Image" src={"/categories/" + info?.childNodes[1]?.id + ".png"} />
                                        <span className="text-secondary dark:text-light">{info?.childNodes[2]?.innerText}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>

                            ) :
                            (
                                <span>Selecionar ícone</span>
                            )}
                    </div>

                    <TitleH3 text="Data" className="my-[5px]" />
                    <div className="w-[50%] h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                        <DatePicker calendarContainer={MyContainerDate} dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px]" selected={startDate} onChange={(date) => setStartDate(date)} />
                        <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
                    </div>

                    <TitleH3 text="Comprovante" className="my-[5px]" />
                    <UploadFiles className={`flex gap-3 mb-[10px]`} files={doc} setFiles={setDoc} />

                    <div className={`flex mb-[10px] justify-between items-center ${recurrent ? "hidden " : "flex "}`}>
                        <span>É parcelado?</span>
                        <button onClick={(ev) => { setInInstallmentsQtt(1), setInInstallments(!inInstallments) }}>{inInstallments ? <ToggleThemeOnIcon /> : <ToggleThemeOffIcon />}</button>
                    </div>
                    {inInstallments && (
                        <div className="flex justify-between items-center py-[16px] ">
                            <InInstallmentsPage accountValue={accountValue} onChange={(ev) => setInInstallmentsQtt(ev.target.value)} />
                            {inInstallmentsQtt > 1 ? (
                                <span>{inInstallmentsQtt} parcelas de R$ {formatLocalCurrency(accountValue / inInstallmentsQtt)}</span>
                            ) : (
                                <span>1 parcela de R$ {formatLocalCurrency(accountValue / 1)}</span>
                            )}
                        </div>
                    )}

                    <div className={`flex mb-[10px] justify-between items-center ${inInstallments ? "hidden" : " flex"}`}>
                        <span>É recorrente?</span>
                        <button onClick={(ev) => setRecurrent(!recurrent)}>{recurrent ? <ToggleThemeOnIcon /> : <ToggleThemeOffIcon />}</button>
                    </div>
                    {recurrent && (
                        <div className="flex justify-between items-center mt-[20px] mb-[25px] ">
                            <span>
                                Selecione a recorrência
                            </span>
                            <select value={recurrentType} onChange={(ev) => setRecurrentType(ev.target.value)} className="bg-light  dark:bg-secondary_less" >
                                <option value="annually">Anualmente</option>
                                <option value="monthly">Mensalmente</option>
                            </select>
                        </div>
                    )}

                    {type === "Despesa" && (
                        <div className={`flex mb-[10px] justify-between items-center`}>
                            <span>Já está pago?</span>
                            <button onClick={(ev) => setPaid(!paid)}>{paid ? <ToggleThemeOnIcon /> : <ToggleThemeOffIcon />}</button>
                        </div>
                    )}

                    <Button onClick={saveTransaction} text={`${isSaving ? "Cadastrando..." : "Cadastrar"}`} className={`mt-[24px] w-full ${isSaving ? "bg-neutral-500" : "bg-primary"}`} />
                </>
            )}

            {type === "Receita" && (
                <>
                    <TitleH3 text="Nome por categoria" className="my-[5px]" />
                    <div onClick={() => { toggleModalSecond(), setDataModalSecond(<AllCategories type={type} />) }} className="w-full text-mygray_more dark:text-mygray_more cursor-pointer px-[10px] flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[44px]">
                        {info ?
                            (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center  gap-4">
                                        <Image id={info} width={30} height={30} alt="Image" src={"/categories/" + info?.childNodes[1]?.id + ".png"} />
                                        <span className="text-secondary dark:text-light">{info?.childNodes[2]?.innerText}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>

                            ) :
                            (
                                <span>Selecionar ícone</span>
                            )}
                    </div>

                    <TitleH3 text="Data" className="my-[5px]" />
                    <div className="w-[50%] h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                        <DatePicker calendarContainer={MyContainerDate} dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px]" selected={startDate} onChange={(date) => setStartDate(date)} />
                        <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
                    </div>

                    <TitleH3 text="Comprovante" className="my-[5px]" />
                    <UploadFiles className={`flex gap-3 mb-[10px]`} files={doc} setFiles={setDoc} />

                    <Button onClick={saveTransaction} text={`${isSaving ? "Cadastrando..." : "Cadastrar"}`} className={`mt-[24px] w-full ${isSaving ? "bg-neutral-500" : "bg-primary"}`} />
                </>
            )}

            {type === "Rendimento" && (
                <>
                    <TitleH3 text="Nome por categoria" className="my-[5px]" />
                    <div onClick={() => { toggleModalSecond(), setDataModalSecond(<AllCategories type={type} />) }} className="w-full text-mygray_more dark:text-mygray_more cursor-pointer px-[10px] flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[44px]">
                        {info ?
                            (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center  gap-4">
                                        <Image id={info} width={30} height={30} alt="Image" src={"/categories/" + info?.childNodes[1]?.id + ".png"} />
                                        <span className="text-secondary dark:text-light">{info?.childNodes[2]?.innerText}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>

                            ) :
                            (
                                <span>Selecionar ícone</span>
                            )}
                    </div>

                    <TitleH3 text="Data" className="my-[5px]" />
                    <div className="w-[50%] h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                        <DatePicker calendarContainer={MyContainerDate} dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px]" selected={startDate} onChange={(date) => setStartDate(date)} />
                        <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
                    </div>

                    <Button onClick={saveTransaction} text={`${isSaving ? "Cadastrando..." : "Cadastrar"}`} className={`mt-[24px] w-full ${isSaving ? "bg-neutral-500" : "bg-primary"}`} />
                </>
            )}

            {type === "Transferencia" && (
                <>
                    <TitleH3 text="De:" className="my-[5px]" />
                    <div onClick={() => { toggleModalSecond(), setDataModalSecond(<AllCategories type={type} choice={1} />) }} className="w-full text-mygray_more dark:text-mygray_more cursor-pointer px-[10px] flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[44px]">
                        {info ?
                            (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center  gap-4">
                                        <Image id={info} width={30} height={30} alt="Image" src={"/categories/" + info?.childNodes[1]?.id + ".png"} />
                                        <span className="text-secondary dark:text-light">{info?.childNodes[2]?.innerText}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>

                            ):
                            (
                                <span>Selecionar ícone</span>
                            )
                        }
                    </div>

                    <TitleH3 text="Para:" className="my-[5px]" />
                    <div onClick={() => { toggleModalSecond(), setDataModalSecond(<AllCategories type={type} choice={2} />) }} className="w-full text-mygray_more dark:text-mygray_more cursor-pointer px-[10px] flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[44px]">
                        {infoSecondTwo ?
                            (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center  gap-4">
                                        <Image id={infoSecondTwo} width={30} height={30} alt="Image" src={"/categories/" + infoSecondTwo?.childNodes[1]?.id + ".png"} />
                                        <span className="text-secondary dark:text-light">{infoSecondTwo?.childNodes[2]?.innerText}</span>
                                    </div>
                                    <ChevronRightIcon />
                                </div>

                            ):
                            (
                                <span>Selecionar ícone</span>
                            )}
                    </div>

                    <TitleH3 text="Data" className="my-[5px]" />
                    <div className="w-[50%] h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                        <DatePicker calendarContainer={MyContainerDate} dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px]" selected={startDate} onChange={(date) => setStartDate(date)} />
                        <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
                    </div>

                    <Button onClick={saveTransaction} text={`${isSaving ? "Cadastrando..." : "Cadastrar"}`} className={`mt-[24px] w-full ${isSaving ? "bg-neutral-500" : "bg-primary"}`} />

                </>
            )}

        </div>

    );
}

export default InfoAdd;