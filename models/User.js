import { model, Schema, models } from "mongoose"

const UserSchema = new Schema ({
    name: { type: String, lowercase: true, required: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true },
    rule: { type: Schema.Types.ObjectId, ref: 'Rule', required: true },
}, {
    timestamps: true,
});

export const User = models.User || model('User', UserSchema);