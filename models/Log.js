import { model, Schema, models } from "mongoose"

const LogSchema = new Schema ({
    message: { type: String, lowercase: true },
    date: { type: Date },
    category_type: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});

export const Log = models.Log || model('Log', LogSchema);