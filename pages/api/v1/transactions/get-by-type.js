import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/Transaction";

export default async function getByType(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
        const { type } = req.query

        var actualYear = new Date().getFullYear();

        function firstDayOfMonth(year, month) {
            return new Date(year, month - 1, 1);
        }

        function lastDayOfMonth(year, month) {
            return new Date(year, month, 1);
        }

        try {  
            const transactions = await Transaction.find({ type: type,
                date: { $gte: firstDayOfMonth(actualYear, new Date().getMonth() + 1), $lt: lastDayOfMonth(actualYear, new Date().getMonth() + 1) }

            }, null, { sort: { "createdAt": -1 } });
            
            return res.json(transactions)
        } catch (error) {
            console.log(error);
        }
    }
}