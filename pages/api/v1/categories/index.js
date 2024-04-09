import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Log } from "@/models/Log";

export default async function Categories (req, res) {
    await mongooseConnect()
    const {method} = req

    if (method === "POST") {            
        
        const { name, type, icon } = req.body;
        const { userId } = req.query

        if(!name) return res.status(422).json({ message: { type: "error", data: "Nome não pode ficar vazio" } })
        if(!type) return res.status(422).json({ message: { type: "error", data: "Tipo não pode ficar vazio"} });
        if(!icon) return res.status(422).json({ message: { type: "error", data: "Ícone não pode ficar vazio"} });
        
        try {
            const categoryExists = await Category.findOne({ name: name })
            if(categoryExists) return res.status(401).json({ message: { type: "error", data: "Já existe categoria com este nome."} });
            
            const category = await Category.create({
                name,
                type,
                icon
            })

            try {
                Log.create({
                    message: `criou uma categoria - ${name} - do tipo`,
                    category_type: type,
                    user: userId
                })
            } catch (error) {
                console.log(error);
            }

            return res.json({category, message: { type: "success", data: "Categoria cadastrada com sucesso"}})

        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }

    if (method === "GET") {

        const { type } = req.query
        let tipo;

        switch (type) {
            case "Despesa":
                tipo = 1
                break;
            case "Receita":
                tipo = 2
                break;
            case "Transferência":
                tipo = 3
                break;
            case "Rendimento":
                tipo = 4
                break;
            default:
                break;
        }

        try {
            const categories = await Category.find({type : tipo})
            return res.json(categories)
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
         
} 