import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    list_answer: {
        type: Array,
        default: []
    },
    answer_true: {
        type: String,
        require: true,
    },
    type: {
        type: Number,
        require: true
    }
});

const Question = mongoose.model('Questions', questionSchema);
export default Question;