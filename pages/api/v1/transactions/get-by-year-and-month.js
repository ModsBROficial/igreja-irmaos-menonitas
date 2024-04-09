import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/Transaction";

export default async function getByYearAndMonth(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
        const {month, year } = req.body

        function firstDayOfMonth(ano, mes) {
            return new Date(ano, mes - 1, 1);
        }

        function lastDayOfMonth(ano, mes) {
            return new Date(ano, mes, 1);
        }

        try {  
            const transactions = await Transaction.find({
                date: { $gte: firstDayOfMonth(year, month), $lt: lastDayOfMonth(year, month) }
            }).sort({ "date": -1 })
            
            return res.json(transactions)
        } catch (error) {
            console.log(error);
        }
    }
}