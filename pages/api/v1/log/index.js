import { mongooseConnect } from "@/lib/mongoose";
import { Log } from "@/models/Log";

export default async function LogIndex(req, res, next){
    await mongooseConnect();
    const { method } = req; 
        
    if (method === "POST") {
        
        const { userId } = req.query;
        const { message } = req.body;

        try {
            Log.create({
                message,
                user: userId,
            })
        } catch (error) {
            console.log(error);
        }
    }
}