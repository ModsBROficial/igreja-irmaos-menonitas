import { model, Schema, models } from "mongoose"

const RuleSchema = new Schema ({
    name: { type: String, lowercase: true, required: true },
}, {
    timestamps: true,
});

export const Rule = models.Rule || model('Rule', RuleSchema);