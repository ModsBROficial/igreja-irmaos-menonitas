import CardHome from "@/components/CardHome";
import BankIcon from "./icons/BankIcon";

const CashInTheBank = ({ data }) => {
    return (
        <CardHome icon={<BankIcon />} data={data || 0} text="Saldo no banco" bg="bg-success" className={" dark:bg-secondary_less"}  />
    );
}
 
export default CashInTheBank;