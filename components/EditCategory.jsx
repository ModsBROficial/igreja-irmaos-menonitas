import { useContext, useEffect, useState } from "react";
import TitleH3 from "./TitleH3";
import InputContainerModal from "@/components/InputContainerModal";
import Button from "./Button";
import SelectContainer from "./SelectContainer";
import { ModalThirdContext } from "@/providers/ModalThirdProvider";
import Image from "next/image";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import axios from "axios";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import { ModalContext } from "@/providers/ModalProvider";
import { useRouter } from "next/router";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import MoreCategories from "./MoreCategories";
import { getCurrentUser } from "@/helpers/getCurrentUser";

const EditCategory = ({ category }) => {
    const { setFlashMessage } = useFlashMessage()
    const { setDataModalThird, toggleModalThird } = useContext(ModalThirdContext)
    const { setDataModalSecond, toggleModalSecond, info, setInfo } = useContext(ModalSecondContext)
    const { toggleModal, setDataModal } = useContext(ModalContext)
    const router = useRouter()

    const categoriesType = [
        {
            _id: 1,
            name: "Despesa"
        },
        {
            _id: 2,
            name: "Receita"
        },
        {
            _id: 3,
            name: "Transferência"
        },
        {
            _id: 4,
            name: "Rendimento"
        }
    ]
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [icon, setIcon] = useState("")

    const [isSetting, setIsSetting] = useState(false)

    const [user, setUser] = useState("")

    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])

    const updateCategory = async () => {
        setIsSetting(true)
        let msgText;
        let msgType = 'success'
        let iconInfo;
        if (info) {
            iconInfo = info?.childNodes[1]?.id
        }

        const data = { name, type, icon: iconInfo }
        try {
            await axios.patch(`${api}/${versionApi}/categories/id/${category?._id}?userId=${user?._id}`, data).then(response => {
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    toggleModalThird()
                    setInfo("")
                    setDataModal("")
                    router.push("/dashboard/categories")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsSetting(false)
    }

    useEffect(() => {
        setName(category?.name)
        setType(category?.type)
        setIcon(category?.icon)
    }, [])


    return (
        <div className="flex flex-col text-sm">
            <TitleH3 text="Nome da categoria" className="mt-[30px]" />
            <InputContainerModal required={true} className={"mt-[16px] bg-gray-100 dark:bg-secondary"} classNameInput="bg-gray-100 dark:bg-secondary" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Nome" />

            <TitleH3 text="Tipo da categoria" className="my-[16px]" />
            <SelectContainer required={true} data={categoriesType} value={type} onchange={(ev) => setType(ev.target.value)} className={"mt-[16px]"} placeholder="Selecione a categoria" />

            <TitleH3 text="Alterar ícone" className="my-[16px]" />
            <div onClick={() => { toggleModalSecond(), setDataModalSecond(<MoreCategories />) }} className="w-full text-mygray_more dark:text-mygray_more cursor-pointer px-[10px] flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-500 h-[44px]">
                {icon && !info &&
                    (

                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center  gap-4">
                                <Image id={info} width={30} height={30} alt="Image" src={"/categories/" + icon + ".png"} />
                                <span className="text-secondary dark:text-light">Alterar ícone</span>
                            </div>
                            <ChevronRightIcon />
                        </div>
                    )
                }

                {info &&
                    (
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center  gap-4">
                                <Image id={info} width={30} height={30} alt="Image" src={"/categories/" + info?.childNodes[1]?.id + ".png"} />
                                <span className="text-secondary dark:text-light">Alterar ícone</span>
                            </div>
                            <ChevronRightIcon />
                        </div>
                    )
                }
            </div>

            <Button onClick={updateCategory} text={`${isSetting ? "Atualizando..." : "Atualizar"}`} className={`mt-[24px] ${isSetting ? "bg-neutral-500" : "bg-primary"}`} />
        </div>
    );
}

export default EditCategory;