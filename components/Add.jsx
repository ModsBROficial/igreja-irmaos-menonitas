import { useContext } from "react";
import AddCardButton from "./AddCardButton";
import TitleH2 from "./TitleH2";
import Calculator from "./Calculator";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import ChevronDownCircleIcon from "./icons/ChevronDownCircleIcon";
import ChevronUpCircleIcon from "./icons/ChevronUpCircleIcon";
import TrendingUpOutlineIcon from "./icons/TrendingUpOutlineIcon";

const Add = () => {
    const {setDataModalSecond, toggleModalSecond} = useContext(ModalSecondContext)

    return (
        <div>
            <TitleH2 text="O que você quer adicionar?" className="mb-[30px]" />
            <div className="grid grid-cols-2 gap-[16px] mx-auto w-fit">
                <AddCardButton onClick={()=> {toggleModalSecond(), setDataModalSecond(<Calculator type="Despesa" />) }} className="border border-danger bg-danger " text="Despesa" icon={<ChevronDownCircleIcon />}  />
                <AddCardButton onClick={()=> {toggleModalSecond(), setDataModalSecond(<Calculator type="Receita" />) }} className="border border-success bg-success" text="Receita" icon={<ChevronUpCircleIcon />} />
                <AddCardButton onClick={()=> {toggleModalSecond(), setDataModalSecond(<Calculator type="Transferencia" />) }} className="border border-success" classNameH2="text-secondary" text="Transferência" icon={<TrendingUpOutlineIcon />} />
                <AddCardButton onClick={()=> {toggleModalSecond(), setDataModalSecond(<Calculator type="Rendimento" />) }} className="border border-success" classNameH2="text-secondary" text="Rendimento" icon={<TrendingUpOutlineIcon />} />
            </div>          
        </div>
    );
}
 
export default Add;