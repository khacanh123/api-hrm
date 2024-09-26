import Contest from "../models/Contest.js";
import data from './data.json' assert {type: 'json'}
const createTest = async (req, res) => {
    try {
        const data = req.body; // req.data should be req.body
        

        // Prepare contest data
        const data_contest = {
            list_question: data.list_question,
            point: data.point,
            list_point: data.list_point,
            title: data.title,
            type: data.type,
            times: data.times,
            description: data.description,
        };

        // Create and save new contest
        const newContest = new Contest(data_contest);
        await newContest.save();

        // Send the saved contest back as response
        res.send(newContest);
        
    } catch (err) {
        console.error(err);  // Log the actual error to investigate
        res.status(500).json({
            error: 'An error occurred',
        });
    }
}

const deleteTest = async (res, req) => {
    try {
        const id = req.body.id;
        console.log(id);
        // const post = await Contest.findByIdAndDelete(id).exec();
        return res.status(200).json({
            status: true,
            message: 'deleted!'
        });
    } catch (error) {
        throw new Error(error.toString())
    }
}
const getTestByID = async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const data = await Contest.findOne({_id: id}).populate('list_question', 'title type list_answer').exec();
        res.status(200).json({
            status: true,
            data: data
        })
    }catch(err) {
        res.status(500).json({
            error: "Bài kiểm tra không tồn tại!"
        })
    }
}
const getListTest = async(req, res) => {
    try {
        const data = await Contest.find();
        res.status(200).json({
            status: true,
            data: data
        })
    }catch(err) {
        res.status(500).json({
            error: "Lỗi!"
        })
    }
}
const givePoint = async(req, res) => {
    try {
        const {id_question, point, answer } = req.body;
        // Fetch questions from the API
        const listQuestion = await fetch('http://localhost:3008/api/question/'+id_question, {
            method: "GET"
        });
        const response = await listQuestion.json();
        switch(response.type) {
            case 1:
            case 2: {
                    if(answer === response.answer_true) {
                        return res.status(200).json({
                             status: true,
                             point: point
                         })
                     }
                     return res.status(200).json({
                         status: true,
                         point: 0
                     })
                }
            case 3: {
                const totalAnswer = response.answer_true.split(', ');
                const pointAnswer = point/totalAnswer.length;
                let total_point = 0;
                answer.map((value, i) => {
                    if(value == totalAnswer[i]) total_point = total_point + pointAnswer;
                })
                return res.status(200).json({
                    status: true,
                    point: total_point
                })
            }
            case 4: {
                const totalAnswer = response.answer_true.split(', ');
                const pointAnswer = point/totalAnswer.length;
                let total_point = 0;
                answer.map((value, i) => {
                    // if(value == totalAnswer[i]) total_point = total_point + pointAnswer;
                    const filter = totalAnswer.filter((i) => i.includes(value));
                    if(filter.length > 0) total_point = total_point + pointAnswer;
                })
                return res.status(200).json({
                    status: true,
                    point: total_point
                })
            }
            case 5: {
                const totalAnswer = response.answer_true.split(', ');
                let total_answer = 0;
                answer.map((value, i) => {
                    if(value == totalAnswer[i]) total_answer = total_answer + 1;
                })
                return res.status(200).json({
                    status: true,
                    point: total_answer == totalAnswer.length ? point : 0
                })
            }
            default: {

            }
        }
    }
    catch(error) {
        res.status(500).json(error)
    }
}
const getDataPayment = async(req, res) => {
    res.status(200).send(data)
}
export default {
    createTest,
    getTestByID,
    getListTest,
    deleteTest,
    givePoint,
    getDataPayment
}