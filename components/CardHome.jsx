import formatLocalCurrency from "@/lib/formatLocalCurrency";

const CardHome = ({icon, text, data, bg , className}) => {
    
    return (
        <div className={`flex items-center bg-gray-100 h-[70px] rounded cursor-default ${className} `}>
            <div className={`w-[35px] flex items-center justify-center mx-[8px] h-[45px] rounded ${bg}`}>
                {icon}
            </div>
            <div className="flex flex-col gap-[2px] max-h-[45px]">
                <h2>{text}</h2>
                <h2 className={`${data < 0 ? "text-danger" : "text-secondary dark:text-light"}`}><span className="mr-[2px]">R$</span><span>{formatLocalCurrency(data)}</span></h2>
            </div>
        </div>
    );
}
 
export default CardHome;