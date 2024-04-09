import formatDate from "@/lib/formatDate"
import formatName from "@/lib/formatName"
import formatHourAndMinutes from "../lib/formatHourAndMinutes";

const CardLog = ({ logs }) => {
    
    
    return (
        <>
            {logs.map(log => (
                <div key={log?._id} className="flex py-[8px] flex-col min-h-[50px] border-b-[0.5px] border-b-gray-300 dark:border-b-secondary  ">
                    <div className="flex gap-[6px] text-[16px] font-bold">
                        <span>{formatDate(log?.createdAt)}</span>
                        <span>às</span>
                        <span>{formatHourAndMinutes(log?.createdAt)}</span>
                    </div>
                    <div className="text-[10px] sm:text-[14px] ">
                        <span>{formatName(log?.user?.name?.split(" ")[0])}</span>
                        <span className="ml-[3px]">{formatName(log?.user?.name?.split(" ")[1])}</span>
                        <span className="hidden md:inline-block md:ml-[4px]">{formatName(log?.user?.name?.split(" ")[2])}</span>
                        <span className="mx-[3px]">-</span>
                        <span>{log?.message}</span>
                        <span className="ml-[3px]">{log?.category_type === 1 && "Despesa"}{log?.category_type === 2 && "Receita"}{log?.category_type === 3 && "Transferência"}{log?.category_type === 4 && "Rendimento"}</span>
                        <span className="-ml-[3px]">{log?.date && `/${formatDate(log?.date)}`}</span>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CardLog;