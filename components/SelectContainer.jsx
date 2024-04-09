import formatName from "@/lib/formatName";
import { useState } from "react";

const SelectContainer= ({ data, placeholder, onchange }) => {
    const [newColor, setNewColor] = useState(false)

    function toggleColor(ev) {
        if (ev) {
            setNewColor(true)
        }else{
            setNewColor(false)
        }
    }
    

    return (
        <div onChange={(ev) => toggleColor(ev.target.value)} className=" w-full overflow-hidden flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[44px] ">
            <select className={`bg-gray-100 dark:bg-secondary pl-[5px] mr-[10px] w-full h-full ${newColor ? ' text-secondary dark:text-light ' : 'text-mygray_more dark:text-placeholder '}`} onChange={onchange} >
                <option value="" className="text-secondary dark:text-light" >{placeholder}</option>
                {data.length > 0 && data.map(item => {
                    return(
                        <option key={item?._id} className="text-secondary dark:text-light" value={item?._id}>{formatName(item?.name)}</option>
                    )
                })}
            </select>
        </div>
    );
}
 
export default SelectContainer;