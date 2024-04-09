import formatName from "@/lib/formatName";
import formatCharacterLimit from "@/lib/formatCharacterLimit";
import Image from "next/image";
import EyeIcon from "./icons/EyeIcon";
import TrashIcon from "./icons/TrashIcon";
import ViewDocument from "@/components/ViewDocument";
import { useContext } from "react";
import { ModalContext } from "@/providers/ModalProvider";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import WarnMessage from "./WarnMessage";
import formatDate from "@/lib/formatDate";

const CardDocument = ({ documents }) => {
    const { toggleModal, setDataModal } = useContext(ModalContext)
    const { toggleModalSecond, setDataModalSecond } = useContext(ModalSecondContext)
    
    return (
        <div className="flex flex-col gap-[10px]">
            {documents.map(document  => (
                <div key={document?._id} className="flex items-center justify-between border-b-[0.5px] border-b-gray-300 dark:border-b-secondary pb-1 ">
                    <div className="flex items-center gap-[10px]">
                        {document?.doc[0]?.includes(".pdf") ? (
                            <Image alt="pdf" width={30} height={30} className="object-contain" src={"/images/pdf.png"} />
                        ) :(
                            <Image alt="news images" width={30} height={30} className="object-contain" src={"/images/img.png"} />
                        )}
                        <span className="text-sm text-secondary dark:text-light ">{formatCharacterLimit(15, formatName(document.name))}</span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <span className="text-sm text-secondary dark:text-light ">{formatDate(document.date)}</span>
                        <EyeIcon onClick={() => {toggleModalSecond(), setDataModalSecond(<ViewDocument document={document} />)}} className="text-secondary dark:text-light cursor-pointer"/>
                        <TrashIcon  onClick={() => { toggleModal(), setDataModal(<WarnMessage item={document} path={`/documents/id/${document?._id}`} back={"documents"} />)}} className="cursor-pointer"/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardDocument;