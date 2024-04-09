import formatName from "@/lib/formatName";
import formatCharacterLimit from "@/lib/formatCharacterLimit";
import Image from "next/image";
import PencilIcon from "./icons/PencilIcon";
import TrashIcon from "./icons/TrashIcon";
import EditUser from "@/components/EditUser";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import WarnMessage from "./WarnMessage";

const CardUser = ({ users, rules }) => {
    const { toggleModal, setDataModal } = useContext(ModalContext)

    return (
        <div className="flex flex-col gap-[10px] ">
            {users.map(user  => (
                <div key={user?._id} className="flex items-center justify-between border-b-[0.5px] border-b-gray-300 dark:border-b-secondary pb-1">
                    <div className="flex items-center gap-[10px]">
                        <Image id={user?._id} width={30} height={30} alt="Image" src={`/rule/${user?.rule?.name}.png`} />
                        <span className="text-sm text-secondary dark:text-light ">{formatCharacterLimit(15, formatName(user.name))}</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <span className="text-sm text-secondary dark:text-light ">{formatCharacterLimit(13, formatName(user.rule.name))}</span>
                        <PencilIcon onClick={() => { toggleModal(), setDataModal(<EditUser user={user} rules={rules} />) }} className="text-secondary dark:text-light  cursor-pointer "/>
                        <TrashIcon  onClick={() => { toggleModal(), setDataModal(<WarnMessage item={user} path={`/users/id/${user?._id}`} back={"manage-accounts"} />) }} className="cursor-pointer"/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardUser;