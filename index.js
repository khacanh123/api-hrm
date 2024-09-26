import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ExpressPeerServer } from 'peer';
import http from 'http'
import QuestionController from './controllers/QuestionController.js';
import ContestController from './controllers/ContestController.js';
import HobbyController from './controllers/HobbyController.js';
import bookCar from './models/BookCar.js';
import nodemailer from 'nodemailer'
// const nodemailer =  require('nodem÷ailer');

config();



const app = express();
// require('dotenv').config();

// const TelegramBot = require('node-telegram-bot-api');
// const token = '7436257881:AAHg3ZVZDyG8qa6vqz_2jOiLK0V43t0rH4s';
// const bot = new TelegramBot(token, {polling: true});
app.use('/public',express.static('public'));
const PORT = process.env.PORT || 3007;

const server = http.Server(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
})
app.use('/peerjs', peerServer);
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect to MongoDB success");
    app.use(cors());
    


    app.use(bodyParser.json());
    // Define the schema
const mySchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  total_money: { type: String, required: true },
  bank_number: { type: String, required: true },
  bank_name: { type: String, required: true },
  status: { type: Number, required: true },
});

const MyModel = mongoose.model('MyModel', mySchema);

// Get list
app.get('/items', async (req, res) => {
  try {
    const items = await MyModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/api/create-question', QuestionController.createQuestion)
app.get('/api/get-question', QuestionController.getAllQuestion)
app.get('/api/question/:id', QuestionController.getQuestionByID)
app.post('/api/create-test', ContestController.createTest)
app.get('/api/get-contest/:id', ContestController.getTestByID)
app.get('/api/get-all-contest', ContestController.getListTest)
app.delete('/api/delete-contest', ContestController.deleteTest)
app.post('/api/give-point', ContestController.givePoint)
app.get('/api/get-data', ContestController.getDataPayment)
app.get('/get-user/:user_id', HobbyController.getUserByID);
app.patch('/update-user', HobbyController.updateUserBasicInfo);
app.patch('/update-password', HobbyController.updatePassword);
app.patch('/update-is-ban', HobbyController.updateIsBan);
app.post('/login', HobbyController.login);
// Create item
app.post('/items', async (req, res) => {
  try {
    console.log(req.body);
    const newItem = new MyModel(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send(error);
  }
});
const api_key = 'AK_CS.7fd8c230774711ef80bb3d5e2ce05983.KQI6QB6yum2sKgScFcbJEmgmUXKFQxPG98JzsWybvmY2I2cjwlHl1uYKbn2wIJp7revP4agF';
app.get('/transaction-status/:id', async (req, res) => {
  const d = new Date();
  const currentDay = d.getFullYear()+'-0'+(d.getMonth()+1)+'-'+d.getDate()
  const listQuestion = await fetch('https://oauth.casso.vn/v2/transactions?fromDate='+currentDay+'&toDate='+currentDay, {
            method: "GET",
            headers: {
              "Authorization": `Apikey ${api_key}`
            }
        });
        const response = await listQuestion.json();
        const records = response.data.records;
        const filterID = records.filter((item) => item.description.includes(req.params.id.toString()));
        res.status(200).json({
          status: filterID.length > 0 ? true : false,
          message: filterID.length > 0 ? 'Đã thanh toán' : 'Chờ thanh toán',
          records: records
        })
})
// bookcar
// API tạo mới (CREATE)
app.post('/bookcar', async (req, res) => {
  try {
      const newBookCar = new bookCar(req.body);
      const savedBookCar = await newBookCar.save();
      res.status(201).json(savedBookCar);
  } catch (error) {
      res.status(500).json({ message: 'Error creating bookCar', error });
  }
});

// API lấy thông tin (GET)
app.get('/bookcar/:id', async (req, res) => {
  try {
      const foundBookCar = await bookCar.findById(req.params.id);
      if (foundBookCar) {
          res.status(200).json(foundBookCar);
      } else {
          res.status(404).json({ message: 'bookCar not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving bookCar', error });
  }
});

// API cập nhật (UPDATE)
app.put('/bookcar/:id', async (req, res) => {
  try {
      const updatedBookCar = await bookCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedBookCar) {
          res.status(200).json(updatedBookCar);
      } else {
          res.status(404).json({ message: 'bookCar not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error updating bookCar', error });
  }
});

app.post('/create-order', async (req, res) => {
  const listQuestion = await fetch('https://api.vietqr.io/v2/generate', {
            method: "POST",
            body: JSON.stringify(res.body.data),
            headers: {
              "X-Authorization": `Bearer ${api_key}`
            }
        });
        const response = await listQuestion.json();
        res.status(200).json({
          data: response
        })
})
// Update status
app.put('/items/:id/status', async (req, res) => {
  try {
    const item = await MyModel.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/send-mail', function(req, res) {
  //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
  var transporter =  nodemailer.createTransport({ // config mail server
    host: 'live.smtp.mailtrap.io',
    port: 587,
    secure: false,
      auth: {
          user: 'api', //Tài khoản gmail vừa tạo
          pass: '748947ad787a02ed0360e192601cfe97' //Mật khẩu tài khoản gmail vừa tạo
      },
  });
 const data = req.body;
 var content = '';
content += `
    <div style="padding: 10px; background-color: #003375">
        <div style="padding: 20px; background-color: white; border-radius: 5px;">
            <h1 style="color: #0085ff">Thông báo đặt xe taxi</h1>
            <p style="color: black; font-size: 16px;">
                <strong>Khách hàng:</strong> ${data.name}<br/>
                <strong>Số điện thoại:</strong> ${data.telephone}<br/>
                <strong>Loại xe:</strong> ${data.car}<br/>
                <strong>Điểm đón:</strong> ${data.start}<br/>
                <strong>Điểm đến:</strong> ${data.end}<br/>
                <strong>Thời gian khởi hành:</strong> ${data.time || 'Chưa xác định'}<br/>
            </p>
        </div>
    </div>
`;

  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
      from: 'hello@demomailtrap.com',
      to: req.body.email,
      subject: '[Khách Đặt Xe] - Ngày '+new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(''),
      text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
      html: content //Nội dung html mình đã tạo trên kia :))
  }
  transporter.sendMail(mainOptions, function(err, info){
      if (err) {
          console.log(err);
          res.send({
            error: true
          })
          // req.flash('mess', 'Lỗi gửi mail: '+err); //Gửi thông báo đến người dùng
          // res.redirect('/');
      } else {
          console.log('Message sent: ' +  info.response);
          res.send({
            error: false
          })
          // req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
          // res.redirect('/');
      }
  });
});

    server.listen(PORT, () => {
      console.log('Dinter running on port ' + PORT);
    })
  } catch(err) {
    console.log(err);
  }
}

main();