import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Transaction } from "@/models/Transaction";
import Layout from "@/components/Layout";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Title from "@/components/Title";
import TitleH3 from "@/components/TitleH3";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
import { useContext, useEffect, useState } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import formatName from "@/lib/formatName";
import Button from "@/components/Button";
import dynamic from "next/dynamic"
import TitleH2 from "@/components/TitleH2";
import CardHome from "@/components/CardHome";
import BankIcon from "@/components/icons/BankIcon";
import axios from "axios";
import { api, versionApi } from "@/lib/configApi";
import useFlashMessage from "@/hooks/useFlashMessage";
import formatDate from "@/lib/formatDate";
import formatLocalCurrency from "@/lib/formatLocalCurrency";
import MoneyIcon from "@/components/icons/MoneyIcon";
import { contextUserAuth } from "@/providers/userAuthProvider";

const Spreadsheet3 = dynamic(() => import("@/components/Spreadsheet3"), {
    ssr: false
})

const Spreadsheet4 = dynamic(() => import("@/components/Spreadsheet4"), {
    ssr: false
})

const Reports = ({ categoriesDb, saldoCaixa, performance, performanceCategory, investmentCategory, allCategories }) => {
    const { setFlashMessage } = useFlashMessage()
    const actualYear = new Date().getFullYear()

    const [startDate, setStartDate] = useState(new Date(`01 01 ${actualYear}`));
    const [endDate, setEndDate] = useState(new Date(`01 01 ${actualYear + 1}`));
    const [category, setCategory] = useState('');
    const [newColor, setNewColor] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [data, setData] = useState('')

    function toggleColor(ev) {
        if (ev) {
            setNewColor(true)
        } else {
            setNewColor(false)
        }
    }

    const categories = [
        {
            name: "acampamento nova vida"
        },
        {
            name: "despesas pastorais"
        },
        {
            name: "dízimo escolinha"
        },
        {
            name: "dízimo igreja"
        },
        {
            name: "energia elétrica"
        },
        {
            name: "investimento"
        },
        {
            name: "lanches"
        },
        {
            name: "limpeza pátio"
        },
        {
            name: "manutencao"
        },
        {
            name: "materiais escolinhas"
        },
        {
            name: "oferta extra"
        },
        {
            name: "redízimo"
        },
        {
            name: "rendimento"
        },
        {
            name: "salário pastor"
        },
    ]

    const getData = async () => {
        setIsSearching(true)
        let msgText;
        let msgType;
        const data = { startDate, endDate, category }

        try {
            await axios.post(`${api}/${versionApi}/transactions/get-report`, data).then(response => {
                setData(response.data);
            })
        } catch (error) {
            msgType = error?.response?.data?.message?.type
            msgText = error?.response?.data?.message?.data
        }
        setFlashMessage(msgText, msgType)
        setIsSearching(false)
    }

    useEffect(() => {
        getData()
    }, [])

    const downloadPDF = async () => {
        setIsDownloading(true)

        const capture = document.getElementById("toDownload")

        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth()
            const componentHeight = doc.internal.pageSize.getHeight()
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('relatorio.pdf')
        })
        setIsDownloading(false)
    }

    return (
        <Layout>
            <Title text="Relatórios" className="mb-[44px]" />
            <div className="flex flex-col lg:flex-row w-[300px] md:w-full mx-auto mb-[16px]">
                <div className="w-[300px] md:w-full flex flex-col md:flex-row md:justify-between lg:justify-start md:gap-[16px] mx-auto">
                    <div className="flex items-center justify-between gap-[16px] mb-[5px] lg:mb-0">
                        <TitleH3 text="Data inicial" />
                        <div className="w-[199px] lg:w-[130px] h-[32px] lg:h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                            <DatePicker showMonthYearPicker showFullMonthYearPicker showFourColumnMonthYearPicker dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px] text-sm" selected={startDate} onChange={(date) => setStartDate(date)} />
                            <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-[16px]">
                        <TitleH3 text="Data final" />
                        <div className="w-[199px] lg:w-[130px] h-[32px] lg:h-[44px] rounded border border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-secondary overflow-hidden flex items-center justify-center">
                            <DatePicker showMonthYearPicker showFullMonthYearPicker showFourColumnMonthYearPicker dateFormat="dd/MM/yyyy" locale={ptBR} className="custom-datepicker bg-transparent w-full mx-[10px] text-sm" selected={endDate} onChange={(date) => setEndDate(date)} />
                            <ChevronDownIcon className="w-4 h-4 mr-[8px]" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mt-[5px] lg:mt-0 gap-[5px] md:gap-[16px]">
                    <div onChange={(ev) => toggleColor(ev.target.value)} className="w-full relative md:w-[50%] lg:w-[150px] overflow-hidden flex rounded items-center bg-gray-100 dark:bg-secondary border-[0.1px] border-gray-200 dark:border-gray-500 h-[32px] lg:h-[44px]">
                        <select value={category} className={`bg-gray-100 dark:bg-secondary pl-[5px] mr-[10px] w-full h-full ${newColor ? ' text-secondary dark:text-light ' : 'text-mygray_more dark:text-placeholder '}`} onChange={(ev) => {setData(''), setCategory(ev.target.value)}} >
                            <option value="" className="text-secondary dark:text-light" >Todas Categorias</option>
                            {categories?.length > 0 && categories?.map(item => (
                                <option key={item?.name} className="text-secondary dark:text-light" value={item?.name}>{formatName(item?.name)}</option>
                            ))}
                            {categoriesDb?.length > 0 && categoriesDb?.map(item => (
                                <option key={item?._id} className="text-secondary dark:text-light" value={item?.name}>{formatName(item?.name)}</option>
                            ))}
                        </select>
                        <ChevronDownIcon className="absolute -right-[1px] top-[1.4px] w-4 h-4 mr-[8px] lg:hidden " />
                    </div>
                    <Button text={isSearching ? "Buscando..." : "Buscar dados"} className={`h-[34px] lg:h-[44px] w-full md:w-[120px] lg:min-w-fit  ${isSearching ? " bg-primary_less" : " bg-primary"}`} onClick={getData} />
                </div>
            </div>

            {data?.length > 0 && (
                <>
                    <div id="toDownload" className={"bg-gray-100 dark:bg-secondary_less py-[24px] px-[2px] rounded"} >
                        {category ? (
                            <>  
                                <div className="flex items-center justify-center flex-col md:flex-row md:gap-1">
                                    <div>{formatName(category)}</div>
                                    <div>{formatDate(startDate)} até {formatDate(endDate)}</div>
                                </div>
                                <Spreadsheet4 data={data} startDate={startDate} />
                            </>
                        ) : (
                            <>
                                {data?.length > 0 && (
                                    <>
                                        <div className="flex items-center justify-center">{formatDate(startDate)} até {formatDate(endDate)}</div>
                                        <Spreadsheet3 data={data} startDate={startDate} />
                                    </>
                                )}
                            </>
                        )}

                        <div className="ml-[10px]">
                            <TitleH3 text={`Rendimentos: R$${performanceCategory?.total ? formatLocalCurrency(performanceCategory?.total): formatLocalCurrency(0)}`} className="text-secondary dark:text-light " />
                            <TitleH3 text={`Investimentos: R$${investmentCategory?.total ? formatLocalCurrency(investmentCategory?.total) : formatLocalCurrency(0)}`} className="text-secondary dark:text-light " />
                        </div>

                        <div className="flex items-center gap-[7px] justify-center mt-[16px]">
                            <CardHome icon={<MoneyIcon />} text="Saldo em caixa" data={saldoCaixa} bg="bg-success" className={" dark:bg-secondary w-[165px]"} />
                            <CardHome icon={<BankIcon />} text="Saldo no banco" data={performance} bg="bg-success" className={" dark:bg-secondary w-[165px]"} />
                        </div>

                        {allCategories.length > 0 && (
                            <div className="mt-[16px] pl-[10px]">
                                <div className="bg-gray-200 dark:bg-secondary h-[1px] mb-[16px]" />

                                <TitleH2 text={`Métricas das categorias`} className="text-base text-secondary dark:text-light mb-[16px]" />
                                <>
                                    {allCategories.map(item => (
                                        <TitleH3 key={item?._id} text={`${formatName(item?._id)} R$${formatLocalCurrency(item?.total)} `} className="text-secondary dark:text-light" />
                                    ))}
                                </>
                            </div>
                        )}

                    </div>
                    <div className="mt-[16px] w-full flex items-center justify-center ">
                        <Button onClick={downloadPDF} text={isDownloading ? "Baixando..." : "Baixar Relatório PDF"} className="bg-primary w-[300px] hidden lg:flex" />
                    </div>
                </>
            )}
        </Layout>
    );
}

export default Reports;

export async function getServerSideProps(req) {
    await mongooseConnect()
    const categoriesDb = await Category.find({})

    const performanceDb = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { name: "rendimento", type: "rendimento" },
                    { type: "transferencia", name: "igreja" }
                ]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$accountValue" }
            }
        }
    ])

    const performanceCategory = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { name: "rendimento", type: "rendimento" },
                ]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$accountValue" }
            }
        }
    ])

    const allCategories = await Transaction.aggregate([
        {
            $group: {
                _id: "$name",
                total: { $sum: "$accountValue" }
            }
        }
    ]).sort({ "total": -1 })

    const investmentCategory = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { name: "investimento" },
                ]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$accountValue" }
            }
        }
    ])

    const saldoCaixaDb = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { type: "receita", paid: true },
                    { $and: [{ type: "despesa" }, { paid: true }] },
                ]
            }
        },
        {
            $group: {
                _id: "$type",
                total: {
                    $sum: {
                        $cond: [
                            { $and: [{ $eq: ["$type", "despesa"] }, { $eq: ["$paid", true] }, { $gt: ["$inInstallmentsQtt", 0] }] },
                            "$inInstallmentValue",
                            "$accountValue"
                        ]
                    }
                }
            }
        },
        {
            $group: {
                _id: null,
                receitas: {
                    $sum: { $cond: { if: { $eq: ["$_id", "receita"] }, then: "$total", else: 0 } }
                },
                despesas: {
                    $sum: { $cond: { if: { $eq: ["$_id", "despesa"] }, then: "$total", else: 0 } }
                },
            }
        },
        {
            $project: {
                _id: 0,
                diferenca: { $subtract: ["$receitas", "$despesas"] }
            }
        }
    ]);

    const transferenciaBancoParaIgreja = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { type: "transferencia", name: "banco" }
                ]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$accountValue" }
            }
        }
    ]);

    const transferenciaIgrejaParaBanco = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { type: "transferencia", name: "igreja" }
                ]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$accountValue" }
            }
        }
    ]);

    let saldoCaixa = saldoCaixaDb[0]?.diferenca
    let performance = performanceDb[0]?.total

    if (transferenciaBancoParaIgreja.length && transferenciaIgrejaParaBanco.length) {
        saldoCaixa = (saldoCaixaDb[0]?.diferenca + transferenciaBancoParaIgreja[0]?.total) - transferenciaIgrejaParaBanco[0]?.total
        performance = performanceDb[0]?.total - transferenciaBancoParaIgreja[0]?.total
    }

    if (transferenciaBancoParaIgreja.length && !transferenciaIgrejaParaBanco.length) {
        saldoCaixa = saldoCaixaDb[0]?.diferenca + transferenciaBancoParaIgreja[0]?.total
        performance = performanceDb[0]?.total - transferenciaBancoParaIgreja[0]?.total
        if (!saldoCaixaDb[0]?.diferenca) {
            saldoCaixa = transferenciaBancoParaIgreja[0]?.total
        }
    }

    if (transferenciaIgrejaParaBanco.length && !transferenciaBancoParaIgreja.length) {
        saldoCaixa = saldoCaixaDb[0]?.diferenca - transferenciaIgrejaParaBanco[0]?.total
    }

    return {
        props: {
            categoriesDb: JSON.parse(JSON.stringify(categoriesDb)),
            saldoCaixa: JSON.parse(JSON.stringify(saldoCaixa) || 0),
            performance: JSON.parse(JSON.stringify(performance) || 0),
            performanceCategory: JSON.parse(JSON.stringify(...performanceCategory) || 0),
            investmentCategory: JSON.parse(JSON.stringify(...investmentCategory) || 0),
            allCategories: JSON.parse(JSON.stringify(allCategories) || 0),
        }
    }
}