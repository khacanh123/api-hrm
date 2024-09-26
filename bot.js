// const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const token = '7436257881:AAHg3ZVZDyG8qa6vqz_2jOiLK0V43t0rH4s';
const bot = new TelegramBot(token, {polling: true});
const data_plan = [];
const data_project = [];
// / Tạo nhóm mới
bot.onText(/\/creategroup (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const groupName = match[1];

    // Logic để tạo nhóm mới
    bot.createChatInviteLink(chatId, groupName)
        .then(response => {
            bot.sendMessage(chatId, `Group '${groupName}' created successfully.`);
        })
        .catch(error => {
            bot.sendMessage(chatId, `Error creating group: ${error.message}`);
        });
});

// Thêm thành viên vào nhóm
// bot.onText(/\/addmember (.+) (.+)/, (msg, match) => {
//     const chatId = msg.chat.id;
//     const groupName = match[1];
//     const userId = match[2];

//     // Logic để thêm thành viên vào nhóm
//     bot.addMemberToGroup(groupName, userId)
//         .then(response => {
//             bot.sendMessage(chatId, `User ${userId} added to group '${groupName}' successfully.`);
//         })
//         .catch(error => {
//             bot.sendMessage(chatId, `Error adding member: ${error.message}`);
//         });
// });

bot.onText(/\/add_member (\d+)/, (msg, match) => {
    const userId = "1078569897";
    const chatId = "-1002216398905";
    // Thêm thành viên vào nhóm
    bot.kickChatMember(chatId, userId)
        .then(() => bot.unbanChatMember(chatId, userId))
        .then(() => bot.sendMessage(chatId, `Thành viên với ID ${userId} đã được thêm vào nhóm.`))
        .catch((error) => bot.sendMessage(chatId, 'Có lỗi xảy ra khi thêm thành viên.'));
});

// Gửi thông báo đến nhóm bất kỳ
bot.onText(/\/notify (.+) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const groupName = match[1];
    const notificationMessage = match[2];

    // Logic để gửi thông báo
    bot.sendMessageToGroup(groupName, notificationMessage)
        .then(response => {
            bot.sendMessage(chatId, `Notification sent to group '${groupName}' successfully.`);
        })
        .catch(error => {
            bot.sendMessage(chatId, `Error sending notification: ${error.message}`);
        });
});
// Lắng nghe lệnh /sendmessage
bot.onText(/\/sendmessage (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1]; // Nội dung tin nhắn từ lệnh

    // Gửi tin nhắn đến nhóm
    const groupId = '-1002216398905'; // Thay bằng chat_id của nhóm
    bot.sendMessage(groupId, message, {parse_mode: 'HTML'})
        .then(() => {
            bot.sendMessage(chatId, 'Message sent successfully.');
        })
        .catch(error => {
            bot.sendMessage(chatId, `Error sending message: ${error}`);
        });
});
// Mảng lưu trữ chat_id của các nhóm
const groupChats = [];

// Lắng nghe tin nhắn mới từ nhóm
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const chatType = msg.chat.type;
    // console.log(msg)
    // Kiểm tra nếu tin nhắn đến từ nhóm
    if (chatType === 'group' || chatType === 'supergroup') {
        // Kiểm tra nếu nhóm chưa được lưu trữ
        if (!groupChats.includes(chatId)) {
            groupChats.push(chatId);
            console.log(`Added new group with chat ID: ${chatId}`);
            // Lưu trữ chat_id vào cơ sở dữ liệu hoặc tệp nếu cần
        }
    }
});

// Lệnh để gửi tin nhắn đến tất cả các nhóm đã lưu
bot.onText(/\/sendtoall (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1];

    // Gửi tin nhắn đến tất cả các nhóm đã lưu
    groupChats.forEach(groupId => {
        bot.sendMessage(groupId, message)
            .catch(error => {
                console.error(`Error sending message to group ${groupId}: ${error}`);
            });
    });

    bot.sendMessage(chatId, 'Message sent to all groups.');
});
const groupId = '-1002216398905'; // Thay bằng chat_id của nhóm

// Tin nhắn với định dạng HTML
const message = `
<b>Hello! Welcome to Hamster Kombat 🐹</b>\n
You are now the director of a crypto exchange.\n
Which one? You choose. Tap the screen, collect coins, pump up your passive income, develop your own income strategy.\n
We’ll definitely appreciate your efforts once the token is listed (the dates are coming soon).\n
Don't forget about your friends — bring them to the game and get even more coins together!
`;

// Hàm gửi tin nhắn
const sendMessage = () => {
    bot.sendMessage(groupId, message, { parse_mode: 'HTML' })
        .then(() => {
            console.log('Message sent successfully');
        })
        .catch(error => {
            console.error(`Error sending message: ${error}`);
        });
};
// Lệnh để nhận userId
bot.onText(/\Optisix (.+)/, (msg, match) => {
    console.log(msg);
    const userId = msg.from.id;
    bot.sendMessage(msg.chat.id, `Chào bạn ${match[1]} ID của bạn là: ${userId}`);
});
bot.onText(/\xxcp (.+)/, (msg, match) => {
    console.log(msg);
    const userId = msg.from.id;
 bot.sendMessage(msg.chat.id, `Một tin nhắn nhắc nhở sẽ được gửi sau ${match[1]} ms`);
    setTimeout(() => {
    bot.sendMessage(msg.chat.id, `Bạn cần thực hiện yêu cầu sau xxxx`);
    }, 3000)   
});
bot.onText(/\ghtxc (.+)/, (msg, match) => {
    // console.log(groupChats);
    const userId = msg.from.id;
    const data = match[1].split(' - ');
    data_plan.push({name: data[0], time: data[1], money: data[2], content: data[3]})
    bot.sendMessage(msg.chat.id, `Kế hoạch được tạo thành công`);
});
bot.onText(/\ViewPlan (.+)/, (msg, match) => {
    // console.log('');
    const userId = msg.from.id
    bot.sendMessage(msg.chat.id, `${data_plan[0].name}`);
});
bot.onText(/\anhhin (.+)/, (msg, match) => {
    // console.log('');
    const userId = msg.from.id
    bot.sendMessage(msg.chat.id, `Bạn chờ chút nha ^^`);
    setTimeout(() => {
    bot.sendMessage(msg.chat.id, `Bạn cần thực hiện kế họach <b>${data_plan[0].name}</b>  \n Thời gian: <b>${data_plan[0].time}</b> \n Chi phí dự kiến:  <b>${data_plan[0].money}</b>`, {parse_mode: 'HTML'});
    }, 3000)
});
bot.onText(/\/addproject (.+)/, (msg, match) => {
    // console.log('');
   data_project.push({name: match[1], list_task: []});
   bot.sendMessage(msg.chat.id, `Tạo dự án <b>${match[1]}</b> thành công!`, {parse_mode: 'HTML'});
});
bot.onText(/\/listproject/, (msg, match) => {
   let display = ``;
   data_project.map((proj, i) => {
    display = display + `${i+1}. ${proj.name} \n`;
   })
   bot.sendMessage(msg.chat.id, `<b>Danh sách dự án: </b> \n${display}`, {parse_mode: 'HTML'});
});
bot.onText(/\/addtaskproject (.+)/, (msg, match) => {
    const splitData = match[1].split(' - ');
    const projectId = Number(splitData[0]);
    const taskName = splitData[1];
    const taskDeadline = splitData[2];

    if (data_project[projectId]) {
        data_project[projectId].list_task = [
            ...data_project[projectId].list_task, 
            {
                name: taskName,
                deadline: taskDeadline,
                status: 'todo'
            }
        ];

        bot.sendMessage(
            msg.chat.id, 
            `Task: <b>${taskName}</b>\nDeadline: <b>${taskDeadline}</b>\nĐã thêm vào dự án <b>${data_project[projectId].name}</b>`, 
            {parse_mode: 'HTML'}
        );
    } else {
        bot.sendMessage(msg.chat.id, `Dự án với ID ${projectId} không tồn tại.`);
    }
});
const addMemberToGroup = () => {
    const userId = "6026843128";
    const chatId = "-1002216398905";
    // Thêm thành viên vào nhóm
    bot.banChatMember(chatId, userId)
        .then(() => bot.unbanChatMember(chatId, userId))
        .then(() => bot.sendMessage(chatId, `Thành viên với ID ${userId} đã được thêm vào nhóm.`))
        .catch((error) => {
            console.error(`Error sending message: ${error}`);
        });
}
// addMemberToGroup();
const addNewGroup = () => {
    const chatId = '5808592610';
    const groupName = 'Ngọc Bảo';
    bot.b(chatId, groupName)
    .then(() => bot.unbanChatSenderChat(chatId, userId))
    .then(response => {
        bot.u(chatId, `Group '${groupName}' created successfully.`);
    })
    .catch(error => {
        bot.sendMessage(chatId, `Error creating group: ${error.message}`);
    });
}
// addNewGroup();

// Gửi tin nhắn ngay lập tức và sau đó mỗi 2 phút
// sendMessage(); // Gửi tin nhắn ngay lập tức
// setInterval(sendMessage, 1 * 60 * 1000); 