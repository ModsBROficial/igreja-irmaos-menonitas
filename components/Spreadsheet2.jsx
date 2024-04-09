import formatLocalCurrency from "@/lib/formatLocalCurrency";
import formatName from "@/lib/formatName";
import getMonth from "@/lib/getMonth";
import sumNumbers from "@/lib/sumNumbers";
import { contextUserAuth } from "@/providers/userAuthProvider";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";

const Spreadsheet2 = ({ categories, className }) => {
    const { themeUser } = useContext(contextUserAuth)

    const options = {
        chart: {
            type: 'pie',
            fontFamily: 'Roboto, Helvetica, Arial',
            foreColor: `${themeUser ? "#FFF" : "#171C22"}`,
        },
        labels: [formatName(categories[0]?._id), formatName(categories[1]?._id), formatName(categories[2]?._id), formatName(categories[3]?._id), formatName(categories[4]?._id)],
        colors: ['#680000', '#8C0007', '#B20021', '#D8303C', '#FF5658'],
        stroke: {
            show: false,
        },
        plotOptions: {
            pie: { 
              donut: {
                size: '65%',
                background: 'transparent',
                labels: {
                  show: true,
                  name: {
                    show: false,
                  },
                  value: {
                    show: true,
                    color: "#FFF",
                    offsetY: 46,
                    formatter: function (val) {
                      return `R$ ${formatLocalCurrency(val)}`
                    }
                  },
                  total: {
                    show: false,
                  }
                }
              },      
            }
          },
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'left',
            itemMargin: {
                horizontal: 0,
                vertical: 5
            }, 
        },
        responsive: [{
            breakpoint: 1000,
            options: {
                chart:{
                    height: 450,
                    width: 370,
                },
                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'left',
                    itemMargin: {
                        horizontal: 80,
                        vertical: 4
                    }, 
                },
            }
        }]
    }

    const series = [categories[0]?.total, categories[1]?.total, categories[2]?.total, categories[3]?.total, categories[4]?.total]

    return (
        <div id="chart" className={`bg-gray-100 flex items-center justify-center px-[10px] py-[30px] dark:bg-secondary_less rounded ${className}`}>
            <ReactApexChart options={options} series={series} type="pie" height={500} width={500} />
        </div>
    );

}

export default Spreadsheet2;