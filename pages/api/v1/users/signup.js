import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Rule } from "@/models/Rule";
import { Log } from "@/models/Log";
import bcrypt from "bcrypt"

export default async function signup (req, res) {
    await mongooseConnect()
    const {method} = req

    if (method === "POST") {            
        
        const { userId } = req.query;
        const { name, email, password, rule } = req.body;

        if(!name) return res.status(422).json({ message: { type: "error", data: "Nome não pode ficar vazio" } })
        if(!email) return res.status(422).json({ message: { type: "error", data: "Email não pode ficar vazio"} });
        if(!password) return res.status(422).json({ message: { type: "error", data: "Senha não pode ficar vazia"} });
        if(!rule) return res.status(422).json({ message: { type: "error", data: "A função não pode ficar vazia"} });
        
        try {
            const userExists = await User.findOne({ email: email })
            if(userExists) return res.status(401).json({ message: { type: "error", data: "Email já registrado"} });
            
            const hash = await bcrypt.hash(password, 12)

            const user = await User.create({
                name,
                email,
                password: hash,
                rule
            })
            
            user.password = undefined
            
            const ruleBb = await Rule.findById(rule)
            try {
                Log.create({
                    message: `cadastrou o usuário ${name} como ${ruleBb?.name}`,
                    user: userId,
                })
            } catch (error) {
                console.log(error);
            }

            return res.json({user, message: { type: "success", data: "Usuário registrado com sucesso"} })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
        
    }
} 