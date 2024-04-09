import CardLinkHome from "@/components/CardLinkHome";
import sumNumbers from "@/lib/sumNumbers";
import ChevronDownCircleIcon from "./icons/ChevronDownCircleIcon";

const Expense = ({ data }) => {
    let monthsFourChart = { despesa : [] }

    data.forEach(element => {
        switch (element.type) {
            case "despesa":
                if(element.inInstallmentValue > 1){
                    monthsFourChart.despesa.push(element.inInstallmentValue)
                }else{
                    monthsFourChart.despesa.push(element.accountValue)
                }
                break;
            default:
                break;
        }
    });

    return (
        <CardLinkHome icon={<ChevronDownCircleIcon />} text="Despesa" data={sumNumbers(monthsFourChart.despesa)} bg="bg-danger" path={"dashboard/transactions?type=despesa"} className={"cursor-pointer"} />
    );
}
 
export default Expense;