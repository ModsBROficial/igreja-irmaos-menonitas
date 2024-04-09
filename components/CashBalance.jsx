import CardHome from "@/components/CardHome";
import MoneyIcon from "./icons/MoneyIcon";

const CashBalance = ({ data }) => {
    
    return (
        <CardHome icon={<MoneyIcon />} text="Saldo em caixa" data={data} bg="bg-success"  className={"dark:bg-secondary_less"} />
    );
}
 
export default CashBalance;