import formatName from "@/lib/formatName";
import Title from "./Title";
import TitleH2 from "./TitleH2";
import TitleH3 from "./TitleH3";
import Image from "next/image";
import formatFirstWordToUpperCase from "@/lib/formatFirstWordToUpperCase";
import useFlashMessage from "@/hooks/useFlashMessage";
import Button from "./Button";
import formatDate from "@/lib/formatDate";

const ViewDocument = ({ document }) => {
    const { setFlashMessage } = useFlashMessage()
    
    const download = async(doc) => {
        let msgText = "Erro ao baixar o arquivo";
        let msgType = 'error'
        
        const docName = doc.split('.com/')[1]
        try {
            const response = await fetch(doc);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = window.document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', `${docName}`);
            window.document.body.appendChild(link);
            link.click();
            window.document.body.removeChild(link)
        } catch (error) {
            setFlashMessage(msgText, msgType)
        }
    }

    return (
        <div className="w-full h-full ">
            <Title className="text-center text-secondary dark:text-light " text={formatName(document?.name)} />
            <div className="flex gap-[10px] mt-[20px] items-center ">
                <TitleH2 text="Data:" />
                <TitleH3 className="mt-[3px]" text={formatDate(document?.date)} />
            </div>
            <div className="flex gap-[10px] my-[5px] ">
                <TitleH2 text="Descrição:" />
                <TitleH3 className="mt-[3px]" text={formatFirstWordToUpperCase(document?.description)} />
            </div>
            <Button text="Baixar documento" className="bg-primary mx-auto h-[30px] my-[10px]" onClick={() => download(document?.doc[0])} />
            <div className="flex items-center overflow-hidden bg-mygray justify-center p-1">
                {document?.doc[0]?.includes(".pdf") ? (
                    <div className="flex justify-center items-center w-[400px] h-full">
                        <iframe className="h-[600px] sm:h-[400px] md:h-[330px]" src={`${document?.doc[0]}`} title="W3Schools Free Online Web Tutorials"></iframe>
                    </div>
                ):(
                    <div className="sm:h-[400px] md:h-[330px]">
                        <Image height={350} width={350} alt={document?.name} src={`${document?.doc}`} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewDocument;