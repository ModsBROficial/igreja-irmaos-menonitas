import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt"

export default async function RecoveryPassword(req, res, next) {
    await mongooseConnect();
    const { method } = req;

    if (method === "POST") {
        const { newPassword, confirmNewPassword } = req.body
        const { token, email } = req.query

        if (!token) return res.status(400).send({ message: { type: "error", data: "Você não está autenticado" } })
        if (!newPassword) return res.status(400).send({ message: { type: "error", data: "Senha não pode ficar vazia" } })
        if (!confirmNewPassword) return res.status(400).send({ message: { type: "error", data: "Confirmação de senha não pode ficar vazia" } })
        
        try {
            
            const user = await User.findOne({ email: email })
            if (!user) return res.status(400).send({ message: { type: "error", data: "Usuário não encontrado" } })
            
            const passwordMatch = await bcrypt.compare(token, user.password)
            if (!passwordMatch) return res.status(400).send({ message: { type: "error", data: "Token inválido" } })

            const newHash = await bcrypt.hash(newPassword, 12)

            user.password = newHash
            await user.save()

            return res.send({ message: { type: "success", data: "Senha alterada com sucesso" } })
        } catch (error) {
            console.log(error);
            return res.send({ message: { type: "error", data: "Error ao redefinir senha" } })
        }
    }
}