import { mongooseConnect } from "@/lib/mongoose";
import { Log } from "@/models/Log";
import { User } from "@/models/User";
import { Rule } from "@/models/Rule";

export default async function LogIndex(req, res, next) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
        function firstDayOfMonth(year, month) {
            return new Date(year, month - 1, 1);
        }
    
        function lastDayOfMonth(year, month) {
            return new Date(year, month, 1);
        }

        const { newMonth, actualYear, rule } = req.body;
        if (!rule) return res.status(422).json({ message: { type: "error", data: "Selecione a função" } });
        if (!newMonth) return res.status(422).json({ message: { type: "error", data: "Selecione a data" } });

        try {
            const logs = await Log.find({
                createdAt: { $gte: firstDayOfMonth(actualYear, newMonth), $lt: lastDayOfMonth(actualYear, newMonth) }
            }).sort({ "createdAt": -1 })
            
            logs.docs = await Promise.all(logs.map(async (log) => {
                log.user = await User.findById(log?.user).select(["name", "rule"])
                log.user.rule = await Rule.findById(log?.user?.rule)
                return log
            }))

            logs.docs = logs.filter(item => item?.user?.rule?.name === rule)
            
            return res.json(logs.docs)
        } catch (error) {
            console.log(error);
        }
    }
}