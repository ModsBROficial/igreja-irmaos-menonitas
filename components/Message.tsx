import bus from '@/lib/bus'
import { useEffect, useState } from 'react'
import CloseCircleIcon from '@/components//icons/CloseCircleIcon'
import CheckCircleIcon from '@/components/icons/CheckCircleIcon'

function Message() {
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        bus.addListener('flash', ({ message, type }) => {

            setVisibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVisibility(false)
            }, 2500);
        })
    }, [])

    if (type === "error") {
        return (
            <div className={`fixed z-[9999999999] transition-all duration-500 ${visibility ? '-top-[0%]' : '-top-[100%]'} left-0 w-full flex justify-center`}>
                <div className=' bg-danger flex text-sm items-center gap-2 text-gray-50 py-1 px-2 rounded-md mt-1'>
                    {message}
                    <CloseCircleIcon />
                </div>
            </div>
        )
    }

    if (type === "success") {
        return (
            <div className={`fixed z-[9999999999] transition-all duration-500 ${visibility ? '-top-[0%]' : '-top-[100%]'} left-0 w-full flex justify-center`}>
                <div className=' bg-success flex text-sm items-center gap-2 text-gray-50 py-1 px-2 rounded-md mt-1'>
                    {message}
                    <CheckCircleIcon />
                </div>
            </div>
        )
    }
    
}

export default Message

