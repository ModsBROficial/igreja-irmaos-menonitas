import formatLocalCurrency from "@/lib/formatLocalCurrency";
import getMonth from "@/lib/getMonth";
import sumNumbers from "@/lib/sumNumbers";
import { contextUserAuth } from "@/providers/userAuthProvider";
import { useContext } from "react";
import Chart from "react-apexcharts";

const Spreadsheet = ({ monthsFour, monthTree, monthTwo, monthOne, actualMonth }) => {
    const {themeUser} = useContext(contextUserAuth)

    let monthFourChart = { despesa : [], receita : [] }
    let monthTreeChart = { despesa : [], receita : [] }
    let monthTwoChart = { despesa : [], receita : [] }
    let monthOneChart = { despesa : [], receita : [] }

    monthsFour.forEach(element => {
        switch (element.type) {
            case "despesa":
                if(element.inInstallmentValue > 1){
                    monthFourChart.despesa.push(element.inInstallmentValue)
                }else{
                    monthFourChart.despesa.push(element.accountValue)
                }
                break;
                case "receita":
                    monthFourChart.receita.push(element.accountValue)
                break;
            default:
                break;
        }
    });

    monthTree.forEach(element => {
        switch (element.type) {
            case "despesa":
                if(element.inInstallmentValue > 1){
                    monthTreeChart.despesa.push(element.inInstallmentValue)
                }else{
                    monthTreeChart.despesa.push(element.accountValue)
                }
                break;
                case "receita":
                    monthTreeChart.receita.push(element.accountValue)
                break;
            default:
                break;
        }
    });

    monthTwo.forEach(element => {
        switch (element.type) {
            case "despesa":
                if(element.inInstallmentValue > 1){
                    monthTwoChart.despesa.push(element.inInstallmentValue)
                }else{
                    monthTwoChart.despesa.push(element.accountValue)
                }
                break;
                case "receita":
                    monthTwoChart.receita.push(element.accountValue)
                break;
            default:
                break;
        }
    });

    monthOne.forEach(element => {
        switch (element.type) {
            case "despesa":
                if(element.inInstallmentValue > 1){
                    monthOneChart.despesa.push(element.inInstallmentValue)
                }else{
                    monthOneChart.despesa.push(element.accountValue)
                }
                break;
                case "receita":
                    monthOneChart.receita.push(element.accountValue)
                break;
            default:
                break;
        }
    });

    let month4 = getMonth(actualMonth - 3)
    let month3 = getMonth(actualMonth - 2)
    let month2 = getMonth(actualMonth -1 )

    const options = {
        chart: {
            id: "basic-bar",
            fontFamily: 'Roboto, Helvetica, Arial',
            foreColor: `${themeUser ? "#FFF" : "#171C22" }`,
            toolbar: {
                show: false,  
            },
        },
        xaxis: {
            categories: [month4, month3, month2, getMonth(actualMonth)]
        },
        colors: ["#1CD174", "#FF5658"],
        title: {
            text: "Últimos 4 meses",
            align: 'left',
            style: {
                fontSize:  '16px',
                fontWeight:  'normal',
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
        grid:{
            show: false,
        }, 
        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusApplication: 'end',
                columnWidth: '70%',
            }
        },
        tooltip: {
            enabled: true,
            theme: `${themeUser ? 'dark' : 'light' }`,
        },   
    }

    const series = [
        {
            name: "Receita", 
            data: [sumNumbers(monthOneChart.receita), sumNumbers(monthTwoChart.receita), sumNumbers(monthTreeChart.receita), sumNumbers(monthFourChart.receita)]
        },
        {
            name: "Despesa", 
            data: [sumNumbers(monthOneChart.despesa), sumNumbers(monthTwoChart.despesa), sumNumbers(monthTreeChart.despesa), sumNumbers(monthFourChart.despesa)]
        },
    ]

    return (
        <div className="bg-gray-100 p-[10px] dark:bg-secondary_less rounded">
            <Chart
                type="bar"
                width="100%"
                height="400px"
                series={series}
                padding={"10px"}
                options={options}
            />
        </div>
    );
    
}
 
export default Spreadsheet;