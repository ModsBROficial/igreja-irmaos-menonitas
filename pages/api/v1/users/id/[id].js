import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Log } from "@/models/Log";
import bcrypt from "bcrypt"

export default async function UserId(req, res) {
    await mongooseConnect()
    const { method } = req

    if (method === "DELETE") {
        const { id, userId } = req.query

        try {
            const user = await User.findById(id)

            await user.deleteOne()
            try {
                Log.create({
                    message: `excluiu o usuário ${user?.name}`,
                    user: userId,
                })
            } catch (error) {
                console.log(error);
            }
            return res.send({ message: { type: "success", data: "Usuário excluido com sucesso" } })
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }

    if (method === "PATCH") {

        const { id } = req.query
        const { name, email, password, rule, userId } = req.body

        try {
            const user = await User.findById(id)
            const admin = await User.findById(userId)
            if(!user) return res.json({ message: { type: "error", data: "Falha ao atualizar o usuário" } })

            if(admin){
                try {
                    Log.create({
                        message: `editou o usuário ${user?.name}`,
                        user: userId,
                    })
                } catch (error) {
                    console.log(error);
                }
            }else{
                try {
                    Log.create({
                        message: `editou os próprios dados`,
                        user: user?._id,
                    })
                } catch (error) {
                    console.log(error);
                }
            }

            if(name) user.name = name
            if(email) user.email = email
            if(rule) user.rule = rule
            
            if(password){
                const hash = await bcrypt.hash(password, 12)
                user.password = hash
            }

            await user.save()
            
            if (admin) {
                return res.send({ message: { type: "success", data: "Usuário atualizado com sucesso" } })
            }
            
            return res.send({ message: { type: "success", data: "Usuário atualizado. Faça login novamente." } })
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
} 