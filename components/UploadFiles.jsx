import { Spinner, SpinnerDeleting } from "./Spinner";
import React, { useState } from "react";
import axios from "axios";
import { versionApi, api } from "@/lib/configApi";
import Image from "next/image";
import useFlashMessage from "@/hooks/useFlashMessage";

const UploadFiles = ({ files, setFiles, className }) => {
    const { setFlashMessage } = useFlashMessage()
    const [isUploading, setIsUploading] = useState(false)
    const [isDeleting, setIsDeleting] = useState('')

    async function uploadFiles(ev) {
        const files = ev.target?.files

        if (files?.length > 0) {
            setIsUploading(true)
            const data = new FormData()
            for (const file of files) {
                data.append("file", file)
            }

            let msgText;
            let msgType;

            try {
                await axios.post(`${api}/${versionApi}/upload-files`, data).then(response => {
                    if (response?.data?.message?.type === "error") {
                        msgText = response?.data?.message?.data
                        msgType = response?.data?.message?.type
                    } else {
                        setFiles(oldFiles => {
                            return [...oldFiles, ...response.data.links];
                        });
                    }
                })
            } catch (error) {
                msgText = error?.response?.data?.message?.data
                msgType = error?.response?.data?.message?.type
            }
            setFlashMessage(msgText, msgType)
            setIsUploading(false)
        }
    }

    async function deleteFile(file) {
        setIsDeleting(file)
        await axios.delete(`${api}/${versionApi}/upload-files?file=${file}`).then(response => {
            if (response?.data?.deleted) {
                let newFiles = files.filter(item => item !== file)
                setFiles(newFiles);
            }
        });
        setIsDeleting('');
    }

    return (
        <div className={`${className}`}>
            {!!files?.length && files.map(link => (
                <div key={link} className="relative flex items-center justify-center h-[80px] w-[80px] rounded-lg border border-gray-200 dark:border-gray-500 overflow-hidden">
                    {link.includes(".pdf") ? (
                        <Image alt="pdf" width={70} height={70} className="object-contain" src={"/images/pdf-g.png"} />
                    ) : (
                        <Image alt="news images" width={128} height={128} className="object-contain" src={link} />
                    )}
                    <button onClick={() => deleteFile(link)} className="absolute font-normal text-sm top-0 right-0 w-6 h-6 bg-danger text-light">
                        X
                    </button>
                    {link === isDeleting && (
                        <div key={link} className="h-[80px] flex items-center absolute">
                            <SpinnerDeleting />
                        </div>
                    )}
                </div>
            ))}
            {isUploading && (
                <div className="h-[80px] flex items-center">
                    <Spinner />
                </div>
            )}
            {files?.length < 1 && (
                <label className="w-[80px] h-[80px] border border-gray-200 dark:border-gray-500 gap-2 cursor-pointer flex flex-col items-center rounded-lg bg-gray-100 dark:bg-secondary text-sm text-placeholder justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span>
                    Upload
                </span>
                <input onChange={uploadFiles} type="file" className="hidden"></input>
            </label>
            )}
        </div>
    );
}

export default UploadFiles;