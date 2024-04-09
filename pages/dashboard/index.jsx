import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/Transaction";
import Layout from "@/components/Layout";
import getMonth from "@/lib/getMonth";
import CardHome from "@/components/CardHome";
import Revenue from "@/components/Revenue";
import Expense from "@/components/Expense";
import CashBalance from "@/components/CashBalance";
import CashInTheBank from "@/components/CashInTheBank";
import formatDate from "@/lib/formatDate";
import dynamic from "next/dynamic"
import TitleH3 from "@/components/TitleH3";
import DizimoIcon from "@/components/icons/DizimoIcon";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFlashMessage from "@/hooks/useFlashMessage";
import { ModalContext } from "@/providers/ModalProvider";

const Spreadsheet = dynamic(() => import("@/components/Spreadsheet"), {
    ssr: false
})

const Spreadsheet2 = dynamic(() => import("@/components/Spreadsheet2"), {
    ssr: false
})

const Dashboard = ({ monthsFour, monthTree, monthTwo, monthOne, dizimo, categories, performance, saldoCaixa }) => {
    const { setFlashMessage } = useFlashMessage()
    const { saldoEmCaixa, setSaldoEmCaixa, saldoEmBanco, setSaldoEmBanco } = useContext(ModalContext)

    let actualMonth = new Date().getMonth() + 1
    const router = useRouter();

    useEffect(() => {
        let msgText = router.query.error || '';

        if (msgText) {
            setFlashMessage(msgText, 'error')
        }
        setSaldoEmCaixa(saldoCaixa || 0)
        setSaldoEmBanco(performance || 0)
    }, [router, setFlashMessage])

    return (
        <Layout>
            <div className="flex h-fi items-end mb-[24px]">
                <span className="font-normal">Resumo de</span>
                <h2 className="ml-[5px] font-normal">{getMonth(actualMonth)}</h2>
            </div>
            <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
                <Revenue data={monthsFour} />
                <Expense data={monthsFour} />
                <CashBalance data={saldoEmCaixa} />
                <CashInTheBank data={saldoEmBanco} />

            </div>
            {dizimo && (
                <div className="w-full mb-[16px]">
                    <CardHome data={dizimo?.accountValue} icon={<DizimoIcon />} text={`Dízimo do último culto: ${formatDate(dizimo.createdAt)}`} bg="bg-success" path={"#"} className={" w-full dark:bg-secondary_less"} />
                </div>
            )}

            <Spreadsheet monthsFour={monthsFour} monthTree={monthTree} monthTwo={monthTwo} monthOne={monthOne} actualMonth={actualMonth} />

            {categories?.length > 4 && (
                <>
                    <TitleH3 text="Top 5 gastos por categoria" className="my-[16px]" />
                    <Spreadsheet2 categories={categories} />
                </>
            )}
        </Layout>
    );
}

export default Dashboard;

export async function getServerSideProps(req) {
    await mongooseConnect()

    var actualYear = new Date().getFullYear();
    var actualMonth = new Date().getMonth() + 1;

    function firstDayOfMonth(year, month) {
        return new Date(year, month - 1, 1);
    }

    function lastDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }

    const monthsFour = await Transaction.find({
        date: { $gte: firstDayOfMonth(actualYear, new Date().getMonth() + 1), $lt: lastDayOfMonth(actualYear, new Date().getMonth() + 1) }
    })

    const monthTree = await Transaction.find({
        date: { $gte: firstDayOfMonth(actualYear, new Date().getMonth()), $lt: lastDayOfMonth(actualYear, new Date().getMonth()) }
    })

    const monthTwo = await Transaction.find({
        date: { $gte: firstDayOfMonth(actualYear, new Date().getMonth() - 1), $lt: lastDayOfMonth(actualYear, new Date().getMonth() - 1) }
    })

    const monthOne = await Transaction.find({
        date: { $gte: firstDayOfMonth(actualYear, new Date().getMonth() - 2), $lt: lastDayOfMonth(actualYear, new Date().getMonth() - 2) }
    })

    const dizimo = await Transaction.findOne({ name: "dízimo igreja", paid: true }, null, { sort: { "createdAt": -1 }, limit: 1, });

    const categories = await Transaction.aggregate([
        {
            $match: {
                type: "despesa",
                date: {
                    $gte: new Date(actualYear, actualMonth - 1, 1),
                    $lt: new Date(actualYear, actualMonth, 1)
                }
            },
        },
        {
            $group: {
                _id: "$name",
                total: {
                    $sum: {
                        $cond: {
                            if: { $gt: ["$inInstallmentsQtt", 0] },
                            then: "$inInstallmentValue",
                            else: "$accountValue"
                        }
                    }
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        },
        {
            $limit: 5
        }
    ])

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
    
    const saldoCaixaDb = await Transaction.aggregate([
        {
            $match: {
                $or: [
                    { type: "receita",  paid: true  },
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
        if(!saldoCaixaDb[0]?.diferenca){
            saldoCaixa = transferenciaBancoParaIgreja[0]?.total
        }
    }

    if (transferenciaIgrejaParaBanco.length && !transferenciaBancoParaIgreja.length) {
        saldoCaixa = saldoCaixaDb[0]?.diferenca - transferenciaIgrejaParaBanco[0]?.total
    }

    return {
        props: {
            monthsFour: JSON.parse(JSON.stringify(monthsFour)),
            monthTree: JSON.parse(JSON.stringify(monthTree)),
            monthTwo: JSON.parse(JSON.stringify(monthTwo)),
            monthOne: JSON.parse(JSON.stringify(monthOne)),
            dizimo: JSON.parse(JSON.stringify(dizimo)),
            categories: JSON.parse(JSON.stringify(categories)),
            performance: JSON.parse(JSON.stringify(performance || 0)),
            saldoCaixa: JSON.parse(JSON.stringify(saldoCaixa || 0)),
        }
    }
}
