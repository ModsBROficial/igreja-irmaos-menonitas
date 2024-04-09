import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function users(req, res){
    await mongooseConnect();
    const { method } = req; 
    
    if (method === "GET"){

        try {            
            const users = await User.find({})
            if (!users) return res.status(401).json({ message: { type: "error", data: "Ainda não há usuário registrado"} });
                        
            return res.send(users)

        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
}