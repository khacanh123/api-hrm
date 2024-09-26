import { v4 as uuidv4 } from 'uuid';
import Question from '../models/MultiChoiceOneRight.js';
const createQuestion = async (req,res) => {
    const data = req.body;
    try {
        switch(data.type) {
            //mot dáp an đúng
            case 1: {
                const addIdListAnswer = data.list_answer.map((list) => {
                    // list['id'] = uuidv4();
                    return {
                        text: list,
                        id: uuidv4()
                    }
                })
                const data_question = {
                    title: data.title,
                    type: data.type,
                    list_answer: addIdListAnswer,
                    answer_true: addIdListAnswer[data.answer_true].id
                }
                const newQuestion = new Question(data_question);
                await newQuestion.save();

                return res.status(200).json(newQuestion)

            }
            case 2: {
                // đúng - sai
                const answer = ['Đúng', 'Sai'];
                const addIdListAnswer = answer.map((list) => {
                    // list['id'] = uuidv4();
                    return {
                        text: list,
                        id: uuidv4()
                    }
                })
                const data_question = {
                    title: data.title,
                    type: data.type,
                    list_answer: addIdListAnswer,
                    answer_true: addIdListAnswer[data.answer_true].id
                }
                const newQuestion = new Question(data_question);
                await newQuestion.save();
                return res.status(200).json(newQuestion)
            }
            case 3: {
                // điền vào chỗ trống
                const data_question = {
                    title: data.title,
                    type: data.type,
                    list_answer: [],
                    answer_true: data.answer_true // a, b, c, d
                }
                const newQuestion = new Question(data_question);
                await newQuestion.save();
                return res.status(200).json(newQuestion)
            }
            case 4: {
                // ghép cặp
                const addIdListAnswer = Array({length: 1}).map((list) => {
                    // list['id'] = uuidv4();
                    const leftID = data.list_answer.left_answer.map((item) => {
                        return {
                            text: item,
                        id: uuidv4()
                        }
                    })
                    const rightID = data.list_answer.right_answer.map((item) => {
                        return {
                            text: item,
                        id: uuidv4()
                        }
                    })
                    return {
                        left_answer: leftID,
                        right_answer: rightID,
                    }
                })
                const getLeftID = addIdListAnswer[0].left_answer.map((item) => item.id)
                const getRighID = addIdListAnswer[0].right_answer.map((item) => item.id)
                const answer_true = Array.from({length: getLeftID.length}).map((v, i) => {
                    return getLeftID[i]+" - "+getRighID[i]
                })
                const data_question = {
                    title: data.title,
                    type: data.type,
                    list_answer: addIdListAnswer,
                    answer_true: answer_true.join(', ')
                }
                const newQuestion = new Question(data_question);
                await newQuestion.save();

                return res.status(200).json(newQuestion)
            }
            case 5: {
                const addIdListAnswer = data.list_answer.map((list) => {
                    // list['id'] = uuidv4();
                    return {
                        text: list,
                        id: uuidv4()
                    }
                })
                const answer_true = data.answer_true.map((item) => {
                    return addIdListAnswer[item].id
                })
                const data_question = {
                    title: data.title,
                    type: data.type,
                    list_answer: addIdListAnswer,
                    answer_true: answer_true.join(', ')
                }
                const newQuestion = new Question(data_question);
                await newQuestion.save();

                return res.status(200).json(newQuestion)
            }
            default: {
                console.log('underfine type!');
            }
        }
    } catch(err) {
        console.log('error');
    }
}
const getAllQuestion = async (req, res) => {
    try {
      const items = await Question.find();
      res.json(items);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  const getQuestionByID = async (req, res) => {
    try {
        const item = await Question.findById(req.params.id);
        res.json(item)
    }catch(error) {
        res.status(500).send(error);
    }
  }
export default {
    createQuestion,
    getAllQuestion,
    getQuestionByID
}