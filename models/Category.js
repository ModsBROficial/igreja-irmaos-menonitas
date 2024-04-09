import { model, Schema, models } from "mongoose"

const CategorySchema = new Schema ({
    name: { type: String, lowercase: true, required: true },
    type: { type: String, lowercase: true, required: true },
    icon: { type: String, required: true },
}, {
    timestamps: true,
});

export const Category = models.Category || model('Category', CategorySchema);