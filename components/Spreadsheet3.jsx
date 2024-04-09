import getMonth from "@/lib/getMonth";
import { contextUserAuth } from "@/providers/userAuthProvider";
import { useContext } from "react";
import Chart from "react-apexcharts";
import TrendingUpOutlineIcon from "./icons/TrendingUpOutlineIcon";
import TitleH2 from "./TitleH2";
import sumNumbers from "@/lib/sumNumbers";
import calcularPorcentagemDeCrescimento from "@/lib/calcularPorcentagemDeCrescimento";
import TrendingUpOutline from "./icons/TrendingUpOutline";
import TitleH3 from "./TitleH3";
import formatLocalCurrency from "@/lib/formatLocalCurrency";

const Spreadsheet3 = ({ data, startDate }) => {
    const { themeUser } = useContext(contextUserAuth)
    var startMonth = new Date(startDate).getMonth() + 1
    let month = []
    
    let valueReceitas = [];
    let valueDespesas = [];

    for (let i = 0; i < data.length; i++) {

        let receita = data[i]?.[0]?.receitas !== undefined ? data[i]?.[0]?.receitas : 0
        let despesa = data[i]?.[0]?.despesas !== undefined ? data[i]?.[0]?.despesas : 0
        let mesAtual = startMonth + i || ""
    
        month.push([receita, despesa, mesAtual])
        
        valueReceitas.push(receita)
        valueDespesas.push(despesa)
    }

    let totalReceita = sumNumbers(valueReceitas)
    let totalDespesa = sumNumbers(valueDespesas)
    let crescimento = calcularPorcentagemDeCrescimento(totalReceita, totalDespesa)

    const categoriesRet = () => {
        let monthsNames = []
        for (let index = 0; index < month.length; index++) {
            monthsNames.push(getMonth(month[index]?.[2]));
        }
        return monthsNames
    }

    let receitas = []
    const receitasValues = () => {
        for (let index = 0; index < month.length; index++) {
            receitas.push(month[index]?.[0])
        }
        return receitas
    }

    let despesas = []
    const despesasValues = () => {
        for (let index = 0; index < month.length; index++) {
            despesas.push(month[index]?.[1])
        }
        return despesas
    }

    const options = {
        chart: {
            id: "basic-bar",
            fontFamily: 'Roboto, Helvetica, Arial',
            foreColor: `${themeUser ? "#FFF" : "#171C22"}`,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: categoriesRet(),
        },
        colors: ["#1CD174", "#FF5658"],
        title: {
            text: "",
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'normal',
            },
        },
        legend: {
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'top',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            fontWeight: 400,
            itemMargin: {
                horizontal: 10,
                vertical: 10
            },
        },
        yaxis: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        plotOptions: {
            bar: {
                borderRadius: `${month?.length >= 4 ? 2 : 4}`,
                borderRadiusApplication: 'end',
                columnWidth: `${month?.length >= 4 ? '70%' : '40px'}`,
            }
        },
        tooltip: {
            enabled: true,
            theme: `${themeUser ? 'dark' : 'light'}`,
        },
    }

    const series = [
        {
            name: "Receita",
            data: receitasValues()
        },
        {
            name: "Despesa",
            data: despesasValues()
        },
    ]

    return (
        <>
            <Chart
                id="apexchartsbasic-bar"
                type="bar"
                width="100%"
                height="400px"
                series={series}
                padding={"10px"}
                options={options}
            />
            <div className="bg-gray-200 dark:bg-secondary h-[1px] mb-[16px]" />

            <div className="flex gap-[10px] items-center justify-center mb-[16px]">
                {crescimento > 0 ? (
                    <>
                        {crescimento > 1 && (
                            <>
                                <TrendingUpOutlineIcon />
                                <TitleH2 text={`Crescimento de ${crescimento.toFixed(2)}%`} className="text-success" />
                            </>
                        )}
                    </>
                ):(
                    <>
                        {crescimento < 1 && (
                            <>
                                <TrendingUpOutline />
                                <TitleH2 text={`Decrescimento de ${crescimento.toFixed(2)}%`} className="text-danger" />
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="pl-[10px]">
                <TitleH2 text={`Principais métricas`} className="text-base text-secondary dark:text-light mb-[16px]" />

                <TitleH3 text={`Receitas: R$${formatLocalCurrency(totalReceita)}`} className="text-success" />
                <TitleH3 text={`Despesas: R$${formatLocalCurrency(totalDespesa)}`} className="text-danger" />
            </div>
        </>
    );

}

export default Spreadsheet3;