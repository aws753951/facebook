const io = require("socket.io")(6970, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// 把已經加過的userID就不重複加入了
const addUser = (userID, socketID) => {
  // array.some((item)=> 檢驗item的條件) 若有一個符合則回傳true，應該也可以用includes檢查 ---- 4
  !users.some((user) => user.userID === userID) &&
    users.push({ userID, socketID });
};

const removeUser = (socketID) => {
  users = users.filter((user) => user.socketID !== socketID);
};

const getUser = (userID) => {
  // apart from userID, also provide its socketID
  return users.find((user) => user.userID === userID);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  // 接收來自client的資訊  => socket.on
  // 頻道為"add user" 內容為userID，針對該內容進行操作使用CALLBACK ---- 2 (上線)
  socket.on("add user", (userID) => {
    // 針對在線上的，加入到users這個array ---- 3
    // 每一次傳到socker的server，自帶.id的屬性，如果需要則用socket.id取出
    addUser(userID, socket.id);
    // 之後馬上傳遞users這個array到 "getUsers"這個頻道 ---- 5
    io.emit("getUsers", users);
  });

  //   下線，客戶端不用特別寫甚麼，視窗關掉就下線了
  socket.on("disconnect", () => {
    console.log("a user disconnected.");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  //   寄送訊息: 客戶端A寄訊息 => 伺服器收到後 => 傳訊息給客戶端B
  //   寄送的訊息可以是字串，set等等
  socket.on("sendMessage", ({ senderID, receiverID, text }) => {
    // 伺服器收到客戶端A的訊息，在已上線的客戶端中找到符合的人
    const foundUser = getUser(receiverID);
    // 針對符合的人，找到他的socketID，寄送到頻道為getMessage，內容為寄送人的{senderID, text}
    io.to(foundUser.socketID).emit("getMessage", {
      senderID,
      text,
    });
  });
});
