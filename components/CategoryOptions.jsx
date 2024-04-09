import TitleH3 from "./TitleH3";
import Button from "./Button";
import PencilIcon from "./icons/PencilIcon";
import TrashIcon from "./icons/TrashIcon";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import useFlashMessage from "@/hooks/useFlashMessage";
import { api, versionApi } from "@/lib/configApi";
import axios from "axios";
import { useRouter } from "next/router";
import EditCategory from "./EditCategory";
import { ModalThirdContext } from "@/providers/ModalThirdProvider";
import { getCurrentUser } from "@/helpers/getCurrentUser";

const CategoryOptions = ({ category }) => {
    const { toggleModal} = useContext(ModalContext)
    const { setDataModalThird, toggleModalThird } = useContext(ModalThirdContext)

    const { setFlashMessage } = useFlashMessage()
    const router = useRouter()

    const [isDeleting, setIsDeleting] = useState(false)

    const [user, setUser] = useState("")


    useEffect(()=>{
        let currentUser = getCurrentUser()
        setUser(currentUser)
    },[])

    const deleteCategory = async() => {
        setIsDeleting(true)
        let msgText;
        let msgType = 'success'
        
        try {
            await axios.delete(`${api}/${versionApi}/categories/id/${category?._id}?userId=${user?._id}`).then(response => { 
                if (response?.data?.message?.type === "error") {
                    msgText = response?.data?.message?.data
                    msgType = response?.data?.message?.type
                } else {
                    msgText = response?.data?.message?.data
                    toggleModal()
                    router.push("/dashboard/categories")
                }
            })
        } catch (error) {
            msgText = error?.response?.data?.message?.data
            msgType = error?.response?.data?.message?.type
        }
        setFlashMessage(msgText, msgType)
        setIsDeleting(false)
    } 

    return (
        <div className="flex flex-col text-sm">
            <TitleH3 text="Mais opções" className="" />
            <div className="flex flex-col w-fit items-start mt-[30px]">
                <Button icon={<PencilIcon className="text-secondary dark:text-light" />} onClick={()=> {toggleModalThird(), setDataModalThird(<EditCategory category={category} />)}} text={"Editar categoria"} className={"mt-[24px] bg-none text-secondary dark:text-light " } />
                <Button icon={<TrashIcon />} onClick={deleteCategory} text={`${isDeleting ? "Excluindo..." : "Excluir categoria"}`} className={"mt-[24px] text-red-400 " } />
            </div>    
        </div>
    );
}
 
export default CategoryOptions;