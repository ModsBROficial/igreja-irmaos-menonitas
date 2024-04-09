import CardLinkHome from "@/components/CardLinkHome";
import sumNumbers from "@/lib/sumNumbers";
import ChevronUpCircleIcon from "./icons/ChevronUpCircleIcon";

const Revenue = ({ data }) => {
    let monthsFourChart = { receita : [] }

    data.forEach(element => {
        switch (element.type) {
            case "receita":
                if (element.paid) {
                    monthsFourChart.receita.push(element.accountValue)
                }
            break;
            default:
                break;
        }
    });

    return (
        <CardLinkHome icon={<ChevronUpCircleIcon />} text="Receitas" data={sumNumbers(monthsFourChart.receita)} bg="bg-success" path={"dashboard/transactions?type=receita"} className={"cursor-pointer"}  />
    );
}
 
export default Revenue;