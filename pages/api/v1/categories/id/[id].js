import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Log } from "@/models/Log";

export default async function CategoryId(req, res) {
    await mongooseConnect()
    const { method } = req

    if (method === "DELETE") {
        const { id, userId } = req.query

        try {
            const category = await Category.findById(id)

            await category.deleteOne()
            try {
                Log.create({
                    message: `excluiu a categoria ${category?.name}`,
                    user: userId
                })
            } catch (error) {
                console.log(error);
            }

            return res.send({ message: { type: "success", data: "Categoria excluida com sucesso" } })
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }

    if (method === "PATCH") {
        const { id, userId } = req.query
        const { name, type, icon } = req.body

        try {
            const category = await Category.findById(id)
            if(!category) return res.json({ message: { type: "error", data: "Falha ao atualizar a categoria" } })

            try {
                Log.create({
                    message: `atualizou a categoria ${category?.name} para ${name} `,
                    category_type: type,
                    user: userId
                })
            } catch (error) {
                console.log(error);
            }

            if(name) category.name = name
            if(type) category.type = type
            if(icon) category.icon = icon

            await category.save()


            return res.send({ message: { type: "success", data: "Categoria atualizada com sucesso" } })
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
} 