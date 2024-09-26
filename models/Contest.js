import mongoose, { Schema } from "mongoose";

const contestSchema = new Schema({
    title: String,
    list_question: [{ type: Schema.Types.ObjectId, ref: 'Questions', required: true }],
    point: Number,
    list_point: {
        type: Array,
        default: [],
    },
    type: String,
    description: String,
    user_id: {
        type: String,
        default: "Admin"
    },
    times: Number
});

const Contest = mongoose.model('Contests', contestSchema);
export default Contest;