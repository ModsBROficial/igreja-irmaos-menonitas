import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Rule } from "@/models/Rule";
import { Log } from "@/models/Log";
import bcrypt from "bcrypt"
import createToken from "@/helpers/create-token";

export default async function login(req, res){
    await mongooseConnect();
    const { method } = req; 
    
    if (method === "POST"){
        const {email, password} = req.body;

        if (!email) return res.status(422).json({ message: { type: "error", data: "Email não pode ficar vazio"} });
        if (!password) return res.status(422).json({ message: { type: "error", data: "Senha não pode ficar vazia"} });

        try {            
            const user = await User.findOne({ email: email })
            if (!user) return res.status(401).json({ message: { type: "error", data: "Usuário não registrado"} });
            
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return res.status(401).json({ message: { type: "error", data: "Email e/ou senha inválidos"} });
            
            user.rule = await Rule.findById(user.rule)

            try {
                Log.create({
                    message : " Fez login no sistema",
                    user: user?._id
                })
            } catch (error) {
                console.log(error);
            }

            await createToken(user, req, res)

        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
}