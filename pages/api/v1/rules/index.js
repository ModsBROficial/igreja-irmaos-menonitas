import { mongooseConnect } from "@/lib/mongoose";
import { Rule } from "@/models/Rule";

export default async function rules(req, res){
    await mongooseConnect();
    const { method } = req; 
    
    if (method === "POST"){
        const {name} = req.body;

        if (!name) return res.status(422).json({ message: { type: "error", data: "Nome não pode ficar vazio"} });
                
        try {            
            const ruleExists = await Rule.findOne({ name })
            if(ruleExists) return res.status(401).json({ message: { type: "error", data: "Função já registrada."} });

            const rule = await Rule.create({
                name,
            })

            return res.json(rule)

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }

    if (method === "GET"){
                
        try {            
            const rules = await Rule.find({ })

            return res.json(rules)

        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
}