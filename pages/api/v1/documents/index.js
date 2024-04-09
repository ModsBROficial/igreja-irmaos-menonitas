import { mongooseConnect } from "@/lib/mongoose";
import { Document } from "@/models/Document";
import { Log } from "@/models/Log";

export default async function Documents(req, res){
    await mongooseConnect();
    const { method } = req; 
    
    if (method === "POST"){

        const {userId} = req.query;
        const {name, date, description, doc} = req.body;

        if (!name) return res.status(422).json({ message: { type: "error", data: "Nome não pode ficar vazio"} });
        if (!date) return res.status(422).json({ message: { type: "error", data: "Data não pode ficar vazia"} });
        if (!description) return res.status(422).json({ message: { type: "error", data: "Descrição não pode ficar vazia"} });
        if (!doc.length) return res.status(422).json({ message: { type: "error", data: "Insira o arquivo do documento"} });
                
        try {            
            const documentExists = await Document.findOne({ name })
            if(documentExists) return res.status(401).json({ message: { type: "error", data: "Já existe documento com este nome."} });

            await Document.create({
                name,
                date,
                description,
                doc,
            })

            try {
                Log.create({
                    message: `adicionou um documento - ${name}`,
                    date,
                    user: userId
                })
            } catch (error) {
                console.log(error);
            }

            return res.json({ message: { type: "success", data: "Documento registrado com sucesso" }  })

        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }

    if (method === "GET"){
                
        try {            
            const documents = await Document.find({ })

            return res.json(documents)

        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
}