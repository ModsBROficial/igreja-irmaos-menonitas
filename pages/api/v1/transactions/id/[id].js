import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/Transaction";
import { Log } from "@/models/Log";

export default async function TransactionId(req, res) {
    await mongooseConnect()
    const { method } = req

    if (method === "DELETE") {
        const { id, userId, deleteAll, hash } = req.query
        try {

            if (deleteAll === "true") {
                const allTransaction = await Transaction.find({ hash })

                await Promise.all(allTransaction.map(async (transaction) => {
                    await transaction.deleteOne()
                }))

                try {
                    Log.create({
                        message: `excluiu as transações ${allTransaction[0]?.name} - ${allTransaction[0]?.type}`,
                        user: userId
                    })
                } catch (error) {
                    console.log(error);
                }
                return res.send({ message: { type: "success", data: "Transações excluidas com sucesso" } })
            }else{
                const transaction = await Transaction.findById(id)
    
                await transaction.deleteOne()
    
                try {
                    Log.create({
                        message: `excluiu a transação ${transaction?.name} - ${transaction?.type}`,
                        user: userId
                    })
                } catch (error) {
                    console.log(error);
                }

                return res.send({ message: { type: "success", data: "Transação excluida com sucesso" } })
            }
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }

    if (method === "PATCH") {
        const { id, userId } = req.query
        const { type, name, name_two, icon, icon_two, date, doc, paid, accountValue, updateAll, hash, recurrent } = req.body

        let value = parseInt(accountValue)

        try {
            if (type === "despesa") {
                if (updateAll) {
                    const allTransaction = await Transaction.find({ hash })
                    
                    await Promise.all(allTransaction.map(async (transaction, i) => {
                        if (paid !== transaction.paid) transaction.paid = paid
                        if (name && name !== transaction.name) transaction.name = name
                        if (icon && icon !== transaction.icon) transaction.icon = icon
                        if (accountValue) {
                            if(transaction.inInstallmentValue){
                                transaction.accountValue = value * transaction.inInstallmentsQtt
                                transaction.inInstallmentValue = value 
                            }
                            if(transaction.recurrent){
                                transaction.accountValue = value
                            }
                        } 
                        if (doc && doc !== transaction.doc) transaction.doc = doc
                        
                        if (date && date !== transaction.date) {
                            if (transaction.recurrentType === "annually") {
                                const expirationData = new Date(date)
                                expirationData.setFullYear(expirationData.getFullYear() + i );
                                transaction.date = expirationData    
                            }else{
                                const expirationData = new Date(date)
                                expirationData.setMonth(expirationData.getMonth() + i );
                                transaction.date = expirationData
                            }
                        }
    
                        await transaction.save()
                        
                    }))
                    try {
                        Log.create({
                            message: `atualizou a transação parcelada ${allTransaction[0]?.name} de ${allTransaction[0]}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
    
                    return res.send({ message: { type: "success", data: "Transação atualizada com sucesso" } })
                }

                const transaction = await Transaction.findById(id)
                
                if (paid && !value && !name && !date && !accountValue) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: não pago para: pago `,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }else if(paid === false){
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: pago para: não pago `,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (value && paid === transaction?.paid && !name) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: ${transaction?.accountValue.toFixed(2)} para: ${value.toFixed(2)}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (value && paid !== transaction?.paid && !name) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: ${transaction?.accountValue.toFixed(2)} para: ${value.toFixed(2)} e de: ${transaction?.paid ? "pago": "não pago"} para: ${paid ? "pago": "não pago"}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (name && name !== transaction?.name) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} para: ${name}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (paid !== transaction.paid) transaction.paid = paid
                if (name && name !== transaction.name) transaction.name = name
                if (icon && icon !== transaction.icon) transaction.icon = icon
                if (date && date !== transaction.date) transaction.date = date
                if (doc && doc !== transaction.doc) transaction.doc = doc
                                
                if (value && transaction?.recurrent) {
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} de ${transaction?.accountValue} para ${value}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                    transaction.inInstallmentValue = value
                    transaction.accountValue = value

                    await transaction.save()

                    return res.send({ message: { type: "success", data: "Transação atualizada com sucesso" } })
                }

                if(transaction.inInstallmentValue){
                    if (accountValue && accountValue !== transaction.inInstallmentValue) transaction.inInstallmentValue = value
                }else{
                    if (accountValue && accountValue !== transaction.accountValue) transaction.accountValue = value
                }

                await transaction.save()

                return res.send({ message: { type: "success", data: "Transação atualizada com sucesso" } })
            }

            if (type === "rendimento") {
                const transaction = await Transaction.findById(id)
                
                if (name && name !== transaction.name) transaction.name = name
                if (icon && icon !== transaction.icon) transaction.icon = icon
                if (date && date !== transaction.date) transaction.date = date
                if (accountValue && accountValue !== transaction.accountValue) transaction.accountValue = value

                try {
                    Log.create({
                        message: `atualizou a transação ${transaction.type} ${transaction.name} - ${transaction?.accountValue} para ${value}`,
                        user: userId
                    })
                } catch (error) {
                    console.log(error);
                }
                
                await transaction.save()

                return res.send({ message: { type: "success", data: "Transação atualizada com sucesso" } })
            }

            if (type === "receita") {
                const transaction = await Transaction.findById(id)

                if (paid && !value && !name && !date && !accountValue) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: não recebido para: recebido `,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }else if(paid === false){
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: recebido para: não recebido `,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (value && paid === transaction?.paid && !name) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: ${transaction?.accountValue.toFixed(2)} para: ${value.toFixed(2)}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (value && paid !== transaction?.paid && !name) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} - de: ${transaction?.accountValue.toFixed(2)} para: ${value.toFixed(2)} e de: ${transaction?.paid ? "recebido": "não recebido"} para: ${paid ? "recebido": "não recebido"}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (name && name !== transaction?.name) {   
                    try {
                        Log.create({
                            message: `atualizou a transação ${transaction?.name} para: ${name}`,
                            user: userId
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (name && name !== transaction.name) transaction.name = name
                if (paid !== transaction.paid) transaction.paid = paid
                if (icon && icon !== transaction.icon) transaction.icon = icon
                if (date && date !== transaction.date) transaction.date = date
                if (accountValue && accountValue !== transaction.accountValue) transaction.accountValue = value

                await transaction.save()

                return res.send({ message: { type: "success", data: "Transação atualizada com sucesso" } })
            }

            if (type === "transferencia") {
                const transaction = await Transaction.findById(id)

                if (icon && icon !== transaction.icon) transaction.icon = icon
                if (icon_two && icon_two !== transaction.icon_two) transaction.icon_two = icon_two
                if (name && name !== transaction.name) transaction.name = name
                if (name_two && name_two !== transaction.name_two) transaction.name_two = name_two
                if (date && date !== transaction.date) transaction.date = date
                if (accountValue && accountValue !== transaction.accountValue) transaction.accountValue = value

                await transaction.save()

                try {
                    Log.create({
                        message: `atualizou a transação ${transaction?.type} ${transaction?.name} - ${transaction?.name_two}`,
                        user: userId
                    })
                } catch (error) {
                    console.log(error);
                }
    
                return res.send({ message: { type: "success", data: "Transação atualizada com sucesso" } })

            }
            
        } catch (error) {
            return res.status(500).json({ message: { type: "error", data: "Aconteceu um erro inesperado" } });
        }
    }
} 