import { model, Schema, models } from "mongoose"

const DocumentSchema = new Schema ({
    name: { type: String, lowercase: true, required: true },
    date: { type: Date, required: true },
    description: { type: String, lowercase: true, required: true },
    doc: { type: Array, required: true},
}, {
    timestamps: true,
});

export const Document = models.Document || model('Document', DocumentSchema);