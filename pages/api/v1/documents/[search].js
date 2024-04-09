import { mongooseConnect } from "@/lib/mongoose";
import { Document } from "@/models/Document";
import { Log } from "@/models/Log";

export default async function Documents(req, res){
    await mongooseConnect();
    const { method } = req; 
    
    if (method === "GET"){
        const { search, userId } = req.query
        const searchP = new RegExp(search, "i")
        try {            
            const documents = await Document.find({ name: { $regex: searchP } })
            try {
                Log.create({
                    message: `fez uma busca pelo documento - ${search} `,
                    user: userId
                })
            } catch (error) {
                console.log(error);
            }
            return res.json(documents)
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
}