import { useContext, useEffect, useState } from "react";
import TitleH3 from "./TitleH3";
import { ModalSecondContext } from "@/providers/ModalSecondProvider";
import CategoryCard from "./CategoryCard";
import { api, versionApi } from "@/lib/configApi";
import axios from "axios";
import formatName from "@/lib/formatName";

const AllCategories = ({ type, choice }) => {
    const { toggleModalSecond, setInfo, setInfoSecondTwo } = useContext(ModalSecondContext)
    const [myCategories, setMyCategories] = useState()

    useEffect(()=>{
        axios.get(`${api}/${versionApi}/categories?type=${type}`).then(response=> {
            setMyCategories(response.data);
        })
    },[])

    const chosen = (event) => {
        toggleModalSecond()
        if (choice === 1) {
            setInfo(event)
        }else{
            setInfoSecondTwo(event)
        }
    }

    return (
        <section>
            <TitleH3 className="text-center mb-[30px]" text={`Categorias de ${type}`} />
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-[16px]">
                {type === "Despesa" && (
                    <>
                        <CategoryCard id="acampamento-nova-vida" onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/acampamento-nova-vida.png" text="Acampamento Nova Vida" />
                        <CategoryCard id="despesas-pastorais"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/despesas-pastorais.png" text="Despesas Pastorais" />
                        <CategoryCard id="energia-eletrica"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/energia-eletrica.png" text="Energia Elétrica" />
                        <CategoryCard id="lanches" onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/lanches.png" text="Lanches" />
                        <CategoryCard id="limpeza-patio"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/limpeza-patio.png" text="Limpeza Pátio" />
                        <CategoryCard id="manutencao" onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/manutencao.png" text="Manutencao" />
                        <CategoryCard id="materiais-escolinhas"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/materiais-escolinhas.png" text="Materiais Escolinhas" />
                        <CategoryCard id="salario-pastor"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/salario-pastor.png" text="Salário Pastor" />
                        <CategoryCard id="redizimo" onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/redizimo.png" text="Redízimo" />
                        <CategoryCard id="investimento" onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/investimento.png" text="Investimento" />
                    </>
                )}
                {type === "Receita" && (
                    <>
                        <CategoryCard id="dizimo-igreja"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/dizimo-igreja.png" text="Dízimo Igreja" />
                        <CategoryCard id="oferta-extra"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/oferta-extra.png" text="Oferta Extra" />
                        <CategoryCard id="dizimo-escolinha"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/dizimo-escolinha.png" text="Dízimo Escolinha" />
                    </>
                )}
                {type === "Transferencia" && (
                    <>
                        <CategoryCard id="church"  onClick={(ev)=> chosen(ev.target.offsetParent)} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/church.png" text="Igreja" />
                        <CategoryCard id="bank"  onClick={(ev)=> chosen(ev.target.offsetParent)} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/bank.png" text="Banco" />
                    </>
                )}
                {type === "Rendimento" && (
                    <>
                        <CategoryCard id="banknote"  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100  dark:hover:bg-secondary dark:bg-secondary_less" img="/categories/banknote.png" text="Rendimento" />
                    </>
                )}

                {myCategories?.length > 0 && myCategories.map(category => (
                    <CategoryCard key={category?._id} id={category?.icon}  onClick={(ev) => { toggleModalSecond(), setInfo(ev.target.offsetParent) }} className="cursor-pointer hover:bg-gray-200 bg-gray-100 dark:hover:bg-secondary dark:bg-secondary_less" img={`/categories/${category?.icon}.png`} text={formatName(category?.name)} />
                ))}
            </div>
        </section>
    );
}

export default AllCategories;