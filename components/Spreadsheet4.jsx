import formatLocalCurrency from "@/lib/formatLocalCurrency";
import getMonth from "@/lib/getMonth";
import sumNumbers from "@/lib/sumNumbers";
import { contextUserAuth } from "@/providers/userAuthProvider";
import { useContext } from "react";
import Chart from "react-apexcharts";
import TitleH2 from "./TitleH2";
import TitleH3 from "./TitleH3";

const Spreadsheet4 = ({ data, type, startDate }) => {
    const { themeUser } = useContext(contextUserAuth)
    var startMonth = new Date(startDate).getMonth() + 1
    let month = []

    let valueReceitas = [];

    for (let i = 0; i < data.length; i++) {
        let receita = data[i]?.[0]?.total || 0
        let despesa = data[i]?.[0]?.despesas || 0
        let mesAtual = startMonth + i || ""

        month.push([receita, despesa, mesAtual])
        valueReceitas.push(receita)

    }
    let totalReceita = sumNumbers(valueReceitas)

    const categoriesRet = () => {
        let monthsNames = []
        for (let index = 0; index < month.length; index++) {
            monthsNames.push(getMonth(month[index]?.[2]));
        }
        return monthsNames
    }

    const receitasValues = () => {
        let receitas = []
        for (let index = 0; index < month.length; index++) {
            receitas.push(month[index]?.[0])
        }
        return receitas
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
            name: "Valor",
            data: receitasValues()
        }
    ]

    return (
        <>
            <Chart
                type="bar"
                width="100%"
                height="400px"
                series={series}
                padding={"10px"}
                options={options}
            />
            <div className="bg-gray-200 dark:bg-secondary h-[1px] mb-[16px]" />

            <div className="pl-[10px]">
                <TitleH2 text={`Principais métricas`} className="text-base text-secondary dark:text-light mb-[16px]" />

                <TitleH3 text={`Acumulado: R$${formatLocalCurrency(totalReceita)}`} className="text-success" />
            </div>
        </>
    );

}

export default Spreadsheet4;