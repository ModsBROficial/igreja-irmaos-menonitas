import { useContext, useState } from "react";
import TitleH2 from "./TitleH2";
import TitleH3 from "./TitleH3";
import RemoveCalc from "./icons/RemoveCalc";
import InfoAdd from "./InfoAdd";
import { ModalThirdContext } from "@/providers/ModalThirdProvider";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import CheckIcon from "./icons/CheckIcon";
import { ModalContext } from "@/providers/ModalProvider";
import formatLocalCurrency from "@/lib/formatLocalCurrency";

const Add = ({ type }) => {
    const {setDataModalThird, toggleModalThird} = useContext(ModalThirdContext)
    const { toggleModalSecond, setDataModalSecond } = useContext(ModalSecondContext)
    const { saldoEmCaixa, saldoEmBanco } = useContext(ModalContext)

    const [initialState, setInitialState] = useState([0])

    function formatCurrency(valor) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }
      
    function formatCurrentList(list) {
        const sum = list.reduce((total, number) => total + number, 0);
        const formattedValue = formatCurrency(sum);
        return formattedValue;
    }

    const formattedResult = formatCurrentList(initialState);


    const addValue = (value) => {
        if (initialState[0] === 0) {
            setInitialState(initialState => {
                return [];
            });
        }
        setInitialState(initialState => {
            return [...initialState, ...value];
        });
    }

    const removeValue = () => {        
        initialState.pop();

        if (initialState.length === 0 ) {
            setInitialState(initialState => {
                return [0];
            });
        }else{
            setInitialState(initialState => {
                return [...initialState];
            });
        }
    }

    const clearDisplay = () => {
        setInitialState([0])
    }

    return (
        <div className="w-full max-w-[320px] h-full flex flex-col">
            <TitleH3 className="text-center" text={`Qual o valor ${type === "Rendimento" ? `dos seus ${type}` : `da sua ${type}`}?`} />
            {type === "Transferencia" && (
                <div className="mt-[16px]">
                    <div className="flex items-center">
                        <TitleH3 text={`Disponível em caixa` } className="my-[5px] mr-[5px]" />
                        <strong> R$ {formatLocalCurrency(saldoEmCaixa)}</strong>
                    </div>
                    <div className="flex items-center">
                    <TitleH3 text={`Disponível no banco `} className="my-[5px] mr-[5px]" />
                        <strong> R$ {formatLocalCurrency(saldoEmBanco)}</strong>
                    </div>
                </div>
            )}
            <div className={`flex items-end ${type === "Transferencia" ? "mt-[20px]":"mt-[80px]" }`}>
                <h2 className="ml-[10px] font-bold text-3xl ">{formattedResult}</h2>
            </div>
            <div className="absolute left-0 bottom-0 mb-[20px] flex items-center w-full">
                <div className="parent mx-auto">
                    <button value={7} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div1 flex items-center justify-center">7</button>
                    <button value={8} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div2 flex items-center justify-center">8</button>
                    <button value={9} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div3 flex items-center justify-center">9</button>
                    <button value={4} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div4 flex items-center justify-center">4</button>
                    <button value={5} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div5 flex items-center justify-center">5</button>
                    <button value={6} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div6 flex items-center justify-center">6</button>
                    <button value={1} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div7 flex items-center justify-center">1</button>
                    <button value={2} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div8 flex items-center justify-center">2</button>
                    <button value={3} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div9 flex items-center justify-center">3</button>
                    <button value={0} onClick={(ev) => addValue(ev.target.value)} className="bg-slate-300 font-bold text-secondary div13 flex items-center justify-center">0</button>
                    <button onClick={( )=> removeValue()} className="bg-slate-300 text-secondary div10 flex items-center justify-center"><RemoveCalc /></button>
                    <button onClick={( )=> clearDisplay()} className="bg-slate-300 font-bold text-secondary div11 flex items-center justify-center">AC</button>
                    <button onClick={()=> {toggleModalSecond(), setDataModalSecond(""), toggleModalThird(), setDataModalThird(<InfoAdd valueCalc={initialState} type={type} />) }} className="div12 flex items-center justify-center h-full bg-success"><CheckIcon /></button>
                </div>
            </div>
        </div>
    );
}
 
export default Add;