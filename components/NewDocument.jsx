import { useContext, useEffect, useState } from "react";
import TitleH3 from "./TitleH3";
import InputContainerModal from "@/components/InputContainerModal";
import TextAreaContainerModal from "@/components/TextAreaContainerModal";
import Button from "./Button";
import axios from "axios";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import { useRouter } from "next/router";
import TitleH2 from "./TitleH2";
import { ModalContext } from "@/providers/ModalProvider";
import UploadFiles from "./UploadFiles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import ptBR from 'date-fns/locale/pt-BR';
import { getCurrentUser } from "@/helpers/getCurrentUser";

const NewDocument = () => {
    const { setFlashMessage } = useFlashMessage()
    const { toggleModal, setDataModal } = useContext(ModalContext)
    const router = useRouter()

    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [description, setDescription] = useState("")
    const [doc, setDoc] = useState([])
    
    const [isSaving, setIsSaving] = useState(false)

    const MyContainerDate = ({ children }) => {
        return (
            <div className="absolute text-sm top-0 -left-5 px-[10px] bg-gray-100 border-[4px] rounded border-gray-200 " >
                {children}
            </div>
        );
    };

    const [user, setUser] = useState("")

    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])

    const saveNewDocument = async () => {
        setIsSaving(true)
        let msgText;
        let msgType = 'success'
        const data = { name, date: startDate, description, doc }

        try {
            await axios.post(`${api}/${versionApi}/documents?userId=${user?._id}`, data).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    setDataModal("")
                    router.push("/dashboard/documents")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsSaving(false)
    }

    return (
        <div className="flex flex-col text-sm">
            <TitleH2 text="Criar Novo Documento" className="mb-[24px]" />

            <TitleH3 text="Nome" />
            <InputContainerModal required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"}  classNameInput="bg-gray-100 dark:bg-secondary" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Nome" />
                        
            <TitleH3 text="Data" />
            <div className="my-[5px] w-[50%] h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                <DatePicker calendarContainer={MyContainerDate} dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px]" selected={startDate} onChange={(date) => setStartDate(date)} />
                <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
            </div>

            <TitleH3 text="Descrição" />
            <TextAreaContainerModal required={true} className={"my-[5px] bg-gray-100 dark:bg-secondary"} cols={3} rows={3}  classNameInput="bg-gray-100 dark:bg-secondary" value={description} onChange={(ev) => setDescription(ev.target.value)} placeholder="Descrição" />
            
            <TitleH3 text="Comprovante" className="mb-[10px]" />
            <UploadFiles className={`flex gap-3`} files={doc} setFiles={setDoc} />

            <Button onClick={saveNewDocument} text={`${isSaving ? "Salvando..." : "Salvar"}`} className={`mt-[24px] ${isSaving ? "bg-neutral-500" : "bg-primary"}`} />
        </div>
    );
}
 
export default NewDocument;

