import { model, Schema, models } from "mongoose"

const TransactionSchema = new Schema ({
    name: { type: String, lowercase: true, required: true },
    name_two: { type: String, lowercase: true },
    icon: { type: String, lowercase: true, required: true },
    icon_two: { type: String, lowercase: true },
    type: { type: String, lowercase: true, required: true },
    accountValue: { type: Number, required: true },
    date: { type: Date, required: true },
    doc: { type: Array },
    inInstallments: { type: Boolean },
    recurrent: { type: Boolean },
    recurrentType: { type: String },
    paid: { type: Boolean },
    inInstallmentsQtt: { type: Number },
    inInstallmentValue: { type: Number },
    inInstallmentNumber: { type: Number },
    hash: { type: String },
}, {
    timestamps: true,
});

export const Transaction = models.Transaction || model('Transaction', TransactionSchema);