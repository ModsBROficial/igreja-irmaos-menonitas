import { mongooseConnect } from "@/lib/mongoose";
import { Document } from "@/models/Document";
import { Log } from "@/models/Log";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
const bucketName = "irmaos-menonitas"

export default async function DocumentId(req, res, next) {
    await mongooseConnect()
    const { method } = req

    const client = new S3Client({
        region: 'sa-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    });

    if (method === "DELETE") {
        const { id, userId } = req.query

        try {
            const document = await Document.findById(id)
            
            let ima = document?.doc[0]?.split('.com/')[1]

            if (ima) {
                await client.send(new DeleteObjectCommand ({
                    Bucket: bucketName,
                    Key: ima
                }))
            }

            try {
                Log.create({
                    message: `excluiu um documento - ${document?.name}`,
                    user: userId
                })
            } catch (error) {
                console.log(error);
            }
                    
            await document.deleteOne()

            return res.json({message: { type: "success", data: "Documento excluido com sucesso" } })
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
} 