const { default: axios } = require("axios");
const express = require("express");
const mongoose = require("mongoose");
// import cors from 'cors';
const cors = require('cors')
const app = express();
const port = 3000;

// Kết nối tới MongoDB (thay đổi URL nếu cần thiết)
mongoose.connect(
  "mongodb+srv://anhhuha4:TtdouwqzJrtVAcyh@cluster0.lmkdj69.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware để parse JSON
app.use(express.json());

// =======================================
// Schema và Model cho request_cate
const requestCateSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  action: {type: Object},
  description: { type: String },
  is_enabled: { type: Boolean, default: true },
  can_edit: { type: Boolean, default: true },
});

const RequestCate = mongoose.model("RequestCate", requestCateSchema);
// get all request_cate from happy time
app.get("/get-request", async (req, res) => {
  try {
    const response = await fetch(
      "https://api-panel.happytimeapp.vn/api/v1/workspace-request-categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYWNjb3VudC5oYXBweXRpbWUudm4vYXBpL3YxL2F1dGgvdG9rZW4iLCJpYXQiOjE3MjMyNzMyMTQsImV4cCI6MTcyMzI3NjgxNCwibmJmIjoxNzIzMjczMjE0LCJqdGkiOiIzWkptRjViUFN0elpwbFd2Iiwic3ViIjoiMjUzODQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl9pZCI6MjUzODQsIndvcmtzcGFjZV9pZCI6NDE4NiwiaWRlbnRpZmljYXRpb25faWQiOjQyMzEwLCJyZWZyZXNoX3Rva2VuX2lkIjoiV3VIYnhEam9IWmJSbG1uNXJCYUtkUjRCSXZvN2pVVkNsSThnMUxjaSIsImNsaWVudF90eXBlIjoxLCJlbXBsb3llZV9pZCI6MTMyMjg0LCJyb2xlX2lkIjoxMjU0MX0.EtYexYel3DQ1ie0ThH5hzfL47rfYTh8OqtUA732Goz2mjHGEJ4_iR3GDMVU2mplbNhSdkYn1K8qrvLwmc39dxlv9PsYinOyWJLdlRmsO463cmt22uQPf3ag6JYaTb_oYIZUS0UrHqrLiGC430N33hFywxwjFZGBwc3933JJNCRdXfZiIZaG1zWuyMiMq-NO0W8sfxlp4JBtyIhU88FLCxSMENHrk7lI4BD9XEUFNP3a_8Zw3LUpxXa89kuHKNw1xNPhw2d3khXXhTShzl5rwR8KXsuv_0srs8otvVoklPwIc1SCiEhHX2Se_MHXuDMYIFfUxOAnRzMYVVm-gfPDSRS6z7ErvRydQ2RPQjCGea2jl6WKLuA1mMV2veurCxukmCY3pKEke291RSJABG299XNdbcZlUPMetAHa8UV5CxB7wXRr8FXD8PIfudEJJWxJp04XnVWVa-KTzqdCFEiycW8FgcnNjHXRW_nSbTEUfjrjfDR4eCicDHfPgGiF0jkZoEM0zuKIC9fTRRBoluroIezPhlOLZbw4cRRR3VGOcph9L9EbBy8N8Dfyd0N-YBQzHm-4XPR4PBrGMD5QyvYjnDMgEjhVXxjW4ujuHLwjuURXk4IA1FVrVVVMY-3XocYFDdd0f-xpK_1B-zf9-xxALtrkPGHPggp5gvfPY0jFpx2I",
        },
      }
    );
    const data_a = await response.json();
    const revertData = data_a.categories.map((key) => {
        return {
            ...key
        }
    })
    // res.json(revertData);
    try {
        const response1 = await fetch(
          "http://localhost:3000/api/request_cate/bulk",
          {
            method: "POST",
            body: JSON.stringify(revertData),
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYWNjb3VudC5oYXBweXRpbWUudm4vYXBpL3YxL2F1dGgvdG9rZW4iLCJpYXQiOjE3MjMyNzMyMTQsImV4cCI6MTcyMzI3NjgxNCwibmJmIjoxNzIzMjczMjE0LCJqdGkiOiIzWkptRjViUFN0elpwbFd2Iiwic3ViIjoiMjUzODQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl9pZCI6MjUzODQsIndvcmtzcGFjZV9pZCI6NDE4NiwiaWRlbnRpZmljYXRpb25faWQiOjQyMzEwLCJyZWZyZXNoX3Rva2VuX2lkIjoiV3VIYnhEam9IWmJSbG1uNXJCYUtkUjRCSXZvN2pVVkNsSThnMUxjaSIsImNsaWVudF90eXBlIjoxLCJlbXBsb3llZV9pZCI6MTMyMjg0LCJyb2xlX2lkIjoxMjU0MX0.EtYexYel3DQ1ie0ThH5hzfL47rfYTh8OqtUA732Goz2mjHGEJ4_iR3GDMVU2mplbNhSdkYn1K8qrvLwmc39dxlv9PsYinOyWJLdlRmsO463cmt22uQPf3ag6JYaTb_oYIZUS0UrHqrLiGC430N33hFywxwjFZGBwc3933JJNCRdXfZiIZaG1zWuyMiMq-NO0W8sfxlp4JBtyIhU88FLCxSMENHrk7lI4BD9XEUFNP3a_8Zw3LUpxXa89kuHKNw1xNPhw2d3khXXhTShzl5rwR8KXsuv_0srs8otvVoklPwIc1SCiEhHX2Se_MHXuDMYIFfUxOAnRzMYVVm-gfPDSRS6z7ErvRydQ2RPQjCGea2jl6WKLuA1mMV2veurCxukmCY3pKEke291RSJABG299XNdbcZlUPMetAHa8UV5CxB7wXRr8FXD8PIfudEJJWxJp04XnVWVa-KTzqdCFEiycW8FgcnNjHXRW_nSbTEUfjrjfDR4eCicDHfPgGiF0jkZoEM0zuKIC9fTRRBoluroIezPhlOLZbw4cRRR3VGOcph9L9EbBy8N8Dfyd0N-YBQzHm-4XPR4PBrGMD5QyvYjnDMgEjhVXxjW4ujuHLwjuURXk4IA1FVrVVVMY-3XocYFDdd0f-xpK_1B-zf9-xxALtrkPGHPggp5gvfPY0jFpx2I",
            },
          }
        );
        const data = await response1.json();
        
        res.status(200).json(data);
    
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Route để tạo mới request_cate
app.post("/api/request_cate", async (req, res) => {
  try {
    const { id, name, description, is_enabled, can_edit } = req.body;

    const newRequestCate = new RequestCate({
      id,
      name,
      description,
      is_enabled,
      can_edit,
    });

    const savedRequestCate = await newRequestCate.save();
    res.status(201).json(savedRequestCate);
  } catch (error) {
    res.status(500).json({ message: "Error creating request_cate", error });
  }
});
// sync data from happy time
// Route để thêm mảng dữ liệu vào request_cate
app.post("/api/request_cate/bulk", async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ message: "Input should be an array of objects" });
    }

    const addedItems = [];
    const skippedItems = [];

    for (const item of data) {
      const existingItem = await RequestCate.findOne({ id: item.id });

      if (!existingItem) {
        const newRequestCate = new RequestCate({
          id: item.id,
          name: item.name,
          description: item.description,
          is_enabled: item.is_enabled,
          can_edit: item.can_edit,
        });

        const savedRequestCate = await newRequestCate.save();
        addedItems.push(savedRequestCate);
      } else {
        skippedItems.push(item);
      }
    }

    res.status(201).json({
      message: "Bulk operation completed",
      addedItems,
      skippedItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during bulk operation", error });
  }
});
// Route để lấy tất cả dữ liệu từ request_cate
app.get('/api/request_cate', async (req, res) => {
    try {
        const requestCates = await RequestCate.find(); // Lấy tất cả document từ collection
        res.status(200).json(requestCates); // Trả về dưới dạng JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});
// =============================================
// Định nghĩa schema cho leave_reason
const leaveReasonSchema = new mongoose.Schema({
    attendance: Number,
    attendance_type: Number,
    code: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    max_day: Number,
    max_day_status: Number,
    max_day_time_apply_type: Number,
    max_leave: Number,
    max_leave_status: Number,
    max_leave_time_apply_type: Number,
    name: { type: String, required: true },
    status: Number,
    type: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

// Tạo model từ schema
const LeaveReason = mongoose.model('LeaveReason', leaveReasonSchema);

app.post("/sync-leave-reason", async (req, res) => {
    try {
      const response = await fetch(
        "https://api-panel.happytimeapp.vn/api/v1/leave-reason",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.body.token}`
        },
        }
      );
      const data_a = await response.json();
      const revertData = data_a.data.data.map((key) => {
          return {
              ...key
          }
      })
    //   res.json(revertData);
      try {
          const response1 = await fetch(
            "http://localhost:3000/api/leave-reason/bulk",
            {
              method: "POST",
              body: JSON.stringify(revertData),
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYWNjb3VudC5oYXBweXRpbWUudm4vYXBpL3YxL2F1dGgvdG9rZW4iLCJpYXQiOjE3MjMyNzMyMTQsImV4cCI6MTcyMzI3NjgxNCwibmJmIjoxNzIzMjczMjE0LCJqdGkiOiIzWkptRjViUFN0elpwbFd2Iiwic3ViIjoiMjUzODQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl9pZCI6MjUzODQsIndvcmtzcGFjZV9pZCI6NDE4NiwiaWRlbnRpZmljYXRpb25faWQiOjQyMzEwLCJyZWZyZXNoX3Rva2VuX2lkIjoiV3VIYnhEam9IWmJSbG1uNXJCYUtkUjRCSXZvN2pVVkNsSThnMUxjaSIsImNsaWVudF90eXBlIjoxLCJlbXBsb3llZV9pZCI6MTMyMjg0LCJyb2xlX2lkIjoxMjU0MX0.EtYexYel3DQ1ie0ThH5hzfL47rfYTh8OqtUA732Goz2mjHGEJ4_iR3GDMVU2mplbNhSdkYn1K8qrvLwmc39dxlv9PsYinOyWJLdlRmsO463cmt22uQPf3ag6JYaTb_oYIZUS0UrHqrLiGC430N33hFywxwjFZGBwc3933JJNCRdXfZiIZaG1zWuyMiMq-NO0W8sfxlp4JBtyIhU88FLCxSMENHrk7lI4BD9XEUFNP3a_8Zw3LUpxXa89kuHKNw1xNPhw2d3khXXhTShzl5rwR8KXsuv_0srs8otvVoklPwIc1SCiEhHX2Se_MHXuDMYIFfUxOAnRzMYVVm-gfPDSRS6z7ErvRydQ2RPQjCGea2jl6WKLuA1mMV2veurCxukmCY3pKEke291RSJABG299XNdbcZlUPMetAHa8UV5CxB7wXRr8FXD8PIfudEJJWxJp04XnVWVa-KTzqdCFEiycW8FgcnNjHXRW_nSbTEUfjrjfDR4eCicDHfPgGiF0jkZoEM0zuKIC9fTRRBoluroIezPhlOLZbw4cRRR3VGOcph9L9EbBy8N8Dfyd0N-YBQzHm-4XPR4PBrGMD5QyvYjnDMgEjhVXxjW4ujuHLwjuURXk4IA1FVrVVVMY-3XocYFDdd0f-xpK_1B-zf9-xxALtrkPGHPggp5gvfPY0jFpx2I",
              },
            }
          );
          const data = await response1.json();
          
          res.status(200).json(data);
      
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.log('errr');
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  app.post('/api/leave-reason', async (req, res) => {
    try {
        const { attendance, attendance_type, code, id, max_day, max_day_status, max_day_time_apply_type, max_leave, max_leave_status, max_leave_time_apply_type, name, status, type } = req.body;
        
        // Tạo một instance mới của LeaveReason từ dữ liệu request
        const newLeaveReason = new LeaveReason({
            attendance,
            attendance_type,
            code,
            id,
            max_day,
            max_day_status,
            max_day_time_apply_type,
            max_leave,
            max_leave_status,
            max_leave_time_apply_type,
            name,
            status,
            type,
        });

        // Lưu dữ liệu vào MongoDB
        await newLeaveReason.save();

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Leave reason created successfully', data: newLeaveReason });
    } catch (error) {
        // Xử lý lỗi và trả về phản hồi lỗi
        res.status(500).json({ message: 'Error creating leave reason', error });
    }
});
  // sync data from happy time
  // Route để thêm mảng dữ liệu vào request_cate
  app.post("/api/leave-reason/bulk", async (req, res) => {
    console.log('tttt');
    try {
      const data = req.body;
  
      if (!Array.isArray(data)) {
        return res
          .status(400)
          .json({ message: "Input should be an array of objects" });
      }
  
      const addedItems = [];
      const skippedItems = [];
  
      for (const item of data) {
        const existingItem = await LeaveReason.findOne({ id: item.id });
  
        if (!existingItem) {
            const cloneItem = {...item};
            delete cloneItem.created_at;
            delete cloneItem.updated_at;
          const newRequestCate = new LeaveReason(cloneItem);
  
          const savedRequestCate = await newRequestCate.save();
          addedItems.push(savedRequestCate);
        } else {
          skippedItems.push(item);
        }
      }
  
      res.status(201).json({
        message: "Bulk operation completed",
        addedItems,
        skippedItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Error during bulk operation", error });
    }
  });
  // Route để lấy tất cả dữ liệu từ request_cate
  app.get('/api/leave-reason', async (req, res) => {
    try {
        const requestCates = await RequestCate.find();
        const listLeaveReason = await LeaveReason.find();
        const convertData = listLeaveReason.map((reason) => {
            const matchedRequest = requestCates[reason.type-1];
            const reason_name = matchedRequest ? matchedRequest.name : 'Unknown'; // Kiểm tra nếu không tìm thấy lý do
            const cloneItem = JSON.parse(JSON.stringify(reason));
            cloneItem['reason_name'] = reason_name;
            return cloneItem;
        });
        res.status(200).json(convertData); // Trả về dưới dạng JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
});

//=====================================
// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    action: Object,
    additional_position: [{ type: String }],
    birthdate: { type: Date },
    branch: Object,
    employee_code: { type: String, default: null },
    employment_category: { type: String, default: null },
    employment_status: { type: Number },
    enable: { type: Boolean, default: true },
    full_name: { type: String, required: true },
    gender: { type: Number },
    group: Object,
    has_used: { type: Boolean, default: true },
    last_year_leave_count: { type: Number, default: 0 },
    leave_count: { type: Number, default: 0 },
    personal_email: { type: String, required: true },
    phone: { type: String },
    picture: { type: String, default: null },
    position: Object,
    role_id: { type: Number },
    role_name: { type: String },
    start_date_of_work: { type: Date },
    work_email: { type: String, required: true },
}, { timestamps: true });

// Tạo model từ schema
const User = mongoose.model('UserOptisix', userSchema);

app.post("/sync-user", async (req, res) => {
    try {
        console.log('ggggg');
        const response = axios.get('https://api-panel.happytimeapp.vn/api/v1/employees?active_status=1&search=&page=1', {
            headers: {
                "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYWNjb3VudC5oYXBweXRpbWUudm4vYXBpL3YxL2F1dGgvdG9rZW4iLCJpYXQiOjE3MjM0NTM2NDAsImV4cCI6MTcyMzQ1NzI0MCwibmJmIjoxNzIzNDUzNjQwLCJqdGkiOiJYWEN1VU9Rdk1RVjl6MnFBIiwic3ViIjoiMjUzODQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl9pZCI6MjUzODQsIndvcmtzcGFjZV9pZCI6NDE4NiwiaWRlbnRpZmljYXRpb25faWQiOjQyMzEwLCJyZWZyZXNoX3Rva2VuX2lkIjoiTkpKOGpuMHF5WTAyb2laYzVzRm5ZaVdOVmRzTWZraG1SM0t4MVdSaCIsImNsaWVudF90eXBlIjoxLCJlbXBsb3llZV9pZCI6MTMyMjg0LCJyb2xlX2lkIjoxMjU0MX0.YLvQf3vsaxktIbDmideYfJmW-7sDtSVpxdW2J6CgTlnc1bYJ-kR4C9ZdwYAOS7SahQzi-lBf9jEq4xRdYvlwk81o6ZZOpZEfUDKUdwe0UwVU_2r9fnd0ZLF7w_KCcEaA87AiHziJrD5g2VpjRGaJRl8IA7OY5Rze5ToMdJOjSnKgJJuzdC3Wo1P8l45kDzKdthg58WmBrrkSRi-Lo6KbmaYYPnB3wflQsdcCjRdpPIEktRd-Ei_WY7DeKfb_6DBPIBGICrjLMpSl8kSQcU2bmUjrkNjp9pwdnanHy7Jlmj1GVgb0keV8BMk6KKYbIeduOtfZXoKCYL7koA2_dSrx9cLRZzIDcNppVqFwupev57bytTVF8utv9Ao9kK5b89L4RXn34IiMUV86kvRUQ3GsswCEod6o3xqbv6ZruVZk6lr3gL-8Ftdb9rUUBg_G3mmqbEt0vLxv_qJAv3P4wxX2DXgsUSWBy7fg_XSRPymEcO5S6MU1t3WiinkedYwHDVWa2aw_SHt1X8IOTyrW7iULDsm0YmtMtp61xxjcK5L8rY9DIZrVZThkM0kWtiTL5_FMi-N_3ac-wSANI8xP9KlwGNFDJlk32itK4K1V5_spgqoM93_Jl3UO0KUjGv7SlZ_p_aVAMTRUDsnL-QdmGed55twQB7R72S-4MSicLieysDw`    
            }
        }).then(async(resp) => {
            // res.json()
            try {
                const response1 = await fetch(
                  "http://localhost:3000/api/user/bulk",
                  {
                    method: "POST",
                    body: JSON.stringify(resp.data.employees),
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYWNjb3VudC5oYXBweXRpbWUudm4vYXBpL3YxL2F1dGgvdG9rZW4iLCJpYXQiOjE3MjMyNzMyMTQsImV4cCI6MTcyMzI3NjgxNCwibmJmIjoxNzIzMjczMjE0LCJqdGkiOiIzWkptRjViUFN0elpwbFd2Iiwic3ViIjoiMjUzODQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl9pZCI6MjUzODQsIndvcmtzcGFjZV9pZCI6NDE4NiwiaWRlbnRpZmljYXRpb25faWQiOjQyMzEwLCJyZWZyZXNoX3Rva2VuX2lkIjoiV3VIYnhEam9IWmJSbG1uNXJCYUtkUjRCSXZvN2pVVkNsSThnMUxjaSIsImNsaWVudF90eXBlIjoxLCJlbXBsb3llZV9pZCI6MTMyMjg0LCJyb2xlX2lkIjoxMjU0MX0.EtYexYel3DQ1ie0ThH5hzfL47rfYTh8OqtUA732Goz2mjHGEJ4_iR3GDMVU2mplbNhSdkYn1K8qrvLwmc39dxlv9PsYinOyWJLdlRmsO463cmt22uQPf3ag6JYaTb_oYIZUS0UrHqrLiGC430N33hFywxwjFZGBwc3933JJNCRdXfZiIZaG1zWuyMiMq-NO0W8sfxlp4JBtyIhU88FLCxSMENHrk7lI4BD9XEUFNP3a_8Zw3LUpxXa89kuHKNw1xNPhw2d3khXXhTShzl5rwR8KXsuv_0srs8otvVoklPwIc1SCiEhHX2Se_MHXuDMYIFfUxOAnRzMYVVm-gfPDSRS6z7ErvRydQ2RPQjCGea2jl6WKLuA1mMV2veurCxukmCY3pKEke291RSJABG299XNdbcZlUPMetAHa8UV5CxB7wXRr8FXD8PIfudEJJWxJp04XnVWVa-KTzqdCFEiycW8FgcnNjHXRW_nSbTEUfjrjfDR4eCicDHfPgGiF0jkZoEM0zuKIC9fTRRBoluroIezPhlOLZbw4cRRR3VGOcph9L9EbBy8N8Dfyd0N-YBQzHm-4XPR4PBrGMD5QyvYjnDMgEjhVXxjW4ujuHLwjuURXk4IA1FVrVVVMY-3XocYFDdd0f-xpK_1B-zf9-xxALtrkPGHPggp5gvfPY0jFpx2I",
                    },
                  }
                );
                const data = await response1.json();
                
                res.status(200).json(data);
            
              } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
              }
        })
    } catch (error) {
        console.log('errr');
      res.status(500).json({ message: 'Internal Server Error ffff' , error});
    }
  });

  app.post("/api/user/bulk", async (req, res) => {
    console.log('tttt');
    try {
      const data = req.body;
  
      if (!Array.isArray(data)) {
        return res
          .status(400)
          .json({ message: "Input should be an array of objects" });
      }
  
      const addedItems = [];
      const skippedItems = [];
  
      for (const item of data) {
        const existingItem = await User.findOne({ id: item.id });
  
        if (!existingItem) {
            const cloneItem = {...item};
            delete cloneItem.created_at;
            delete cloneItem.updated_at;
          const newRequestCate = new User(cloneItem);
  
          const savedRequestCate = await newRequestCate.save();
          addedItems.push(savedRequestCate);
        } else {
          skippedItems.push(item);
        }
      }
  
      res.status(201).json({
        message: "Bulk operation completed",
        addedItems,
        skippedItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Error during bulk operation", error });
    }
  });
  const role = [
    {
      "name": "Super Admin",
      "code": "super_admin",
      "id": 12541
    },
    {
      "name": "Admin",
      "code": "admin",
      "id": 12542
    },
    {
      "name": "Nhân viên",
      "code": "employee",
      "id": 12543
    }
  ]
  
  // Route để lấy tất cả dữ liệu từ request_cate
  app.get('/api/get-user', async (req, res) => {
      try {
          const requestCates = await User.find();
          const revertData = requestCates.map((item) => {
            const filter_role = role.filter((r) =>r.id == item.role_id)[0];
            item['role_id'] = filter_role;
            return item;
          })
          res.status(200).json(revertData); // Trả về dưới dạng JSON
      } catch (error) {
          res.status(500).json({ message: 'Error fetching data', error });
      }
  });
  app.post('/api/login', async (req, res) => {
    try {
        const response1 = await fetch(
            "http://localhost:3000/api/get-user",
            {
              method: "GET",
              
            }
          );
          const data = await response1.json();
          const filter_user = data.filter((user) => user.work_email == req.body.email).length;
          if(filter_user > 0) {
            // user có trong list employee
            res.status(200).json({
                status: true,
                message: 'Login successfully!'
            })
          }else {
            res.status(201).json({
                status: false,
                message: 'user not correct'
            })
          }
          
    } catch(err) {
        res.status(500).json({message: 'Error'})
    }
  })
  const groupSchema = new mongoose.Schema({
    id: Number,
    parent_id: String,
    path: String,
    path_to_self: String,
    title: String,
    type: String,
    value: String,
    children: Array
  })
  const Group = mongoose.model('GroupOptisix', groupSchema);

  // sync data
  app.post("/sync-group", async (req, res) => {
    try {
        console.log('ggggg');
        const response = axios.get('https://api-panel.happytimeapp.vn/api/v1/groups/list-groups-positions', {
            headers: {
                "Authorization": req.body.token    
            }
        }).then(async(resp) => {
            // res.json(resp.data['groups-positions'].children)
            try {
                const response1 = await fetch(
                  "http://localhost:3000/api/group/bulk",
                  {
                    method: "POST",
                    body: JSON.stringify(resp.data['groups-positions'].children),
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJodHRwOi8vYWNjb3VudC5oYXBweXRpbWUudm4vYXBpL3YxL2F1dGgvdG9rZW4iLCJpYXQiOjE3MjMyNzMyMTQsImV4cCI6MTcyMzI3NjgxNCwibmJmIjoxNzIzMjczMjE0LCJqdGkiOiIzWkptRjViUFN0elpwbFd2Iiwic3ViIjoiMjUzODQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcl9pZCI6MjUzODQsIndvcmtzcGFjZV9pZCI6NDE4NiwiaWRlbnRpZmljYXRpb25faWQiOjQyMzEwLCJyZWZyZXNoX3Rva2VuX2lkIjoiV3VIYnhEam9IWmJSbG1uNXJCYUtkUjRCSXZvN2pVVkNsSThnMUxjaSIsImNsaWVudF90eXBlIjoxLCJlbXBsb3llZV9pZCI6MTMyMjg0LCJyb2xlX2lkIjoxMjU0MX0.EtYexYel3DQ1ie0ThH5hzfL47rfYTh8OqtUA732Goz2mjHGEJ4_iR3GDMVU2mplbNhSdkYn1K8qrvLwmc39dxlv9PsYinOyWJLdlRmsO463cmt22uQPf3ag6JYaTb_oYIZUS0UrHqrLiGC430N33hFywxwjFZGBwc3933JJNCRdXfZiIZaG1zWuyMiMq-NO0W8sfxlp4JBtyIhU88FLCxSMENHrk7lI4BD9XEUFNP3a_8Zw3LUpxXa89kuHKNw1xNPhw2d3khXXhTShzl5rwR8KXsuv_0srs8otvVoklPwIc1SCiEhHX2Se_MHXuDMYIFfUxOAnRzMYVVm-gfPDSRS6z7ErvRydQ2RPQjCGea2jl6WKLuA1mMV2veurCxukmCY3pKEke291RSJABG299XNdbcZlUPMetAHa8UV5CxB7wXRr8FXD8PIfudEJJWxJp04XnVWVa-KTzqdCFEiycW8FgcnNjHXRW_nSbTEUfjrjfDR4eCicDHfPgGiF0jkZoEM0zuKIC9fTRRBoluroIezPhlOLZbw4cRRR3VGOcph9L9EbBy8N8Dfyd0N-YBQzHm-4XPR4PBrGMD5QyvYjnDMgEjhVXxjW4ujuHLwjuURXk4IA1FVrVVVMY-3XocYFDdd0f-xpK_1B-zf9-xxALtrkPGHPggp5gvfPY0jFpx2I",
                    },
                  }
                );
                const data = await response1.json();
                
                res.status(200).json(data);
            
              } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
              }
        })
    } catch (error) {
        console.log('errr');
      res.status(500).json({ message: 'Internal Server Error ffff' , error});
    }
  });

  app.post("/api/group/bulk", async (req, res) => {
    console.log('tttt');
    try {
      const data = req.body;
  
      if (!Array.isArray(data)) {
        return res
          .status(400)
          .json({ message: "Input should be an array of objects" });
      }
  
      const addedItems = [];
      const skippedItems = [];
  
      for (const item of data) {
        const existingItem = await Group.findOne({ id: item.id });
  
        if (!existingItem) {
            const cloneItem = {...item};
            delete cloneItem.created_at;
            delete cloneItem.updated_at;
          const newRequestCate = new Group(cloneItem);
  
          const savedRequestCate = await newRequestCate.save();
          addedItems.push(savedRequestCate);
        } else {
          skippedItems.push(item);
        }
      }
  
      res.status(201).json({
        message: "Bulk operation completed",
        addedItems,
        skippedItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Error during bulk operation", error });
    }
  });
  app.get('/api/get-tree-groups', async(req, res) => {
    const listUser = await User.find();
    const listGroup = await Group.find();
    const listData = listGroup.map((group) => {
        const returnData = {}
        returnData['id'] = group.id;
        returnData['title'] = group.title;
        returnData['tree_groups'] = []
        const findUser = listUser.filter((user) => user.position.id == group.id);
        if(findUser.length > 0) returnData['employee'] = findUser;
        else returnData['employee'] = [];
        if(group.children.length > 0) {
            group.children.map((child) => {
                const dataChild = {};
                dataChild['id'] = child.id;
                dataChild['title'] = child.title;
                const filter_user = listUser.filter((user) => user.group.id == child.parent_id && user.position.id == child.id)
                if(filter_user.length > 0) dataChild['employee'] = filter_user;
                else dataChild['employee'] = []
                dataChild['children'] = [];
                returnData['tree_groups'].push(dataChild);
                if(child.hasOwnProperty('children')) {
                    child.children.map((value) => {
                        const child_value = {};
                        child_value['id'] = value.id;
                child_value['title'] = value.title;
                const filter_user = listUser.filter((user) => user.group.id == value.parent_id && user.position.id == value.id)
                if(filter_user.length > 0) child_value['employee'] = filter_user;
                else child_value['employee'] = [];
                dataChild['children'].push(child_value);
                    })
                }
            })
        }
    return returnData;
    })
    res.json({
        status: true,
        data: listData,
        list: listGroup
    })
  })
// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
