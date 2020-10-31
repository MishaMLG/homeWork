//Борис
// const WebSocket = require('ws');
// const webSocketConfig = new WebSocket.Server({port: 1234});

// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync');
// const { v4: uuidv4 } = require('uuid');

// const adapter = new FileSync('db.json')
// const db = low(adapter)



// webSocketConfig.on('connection', function (wsParams) {
//     wsParams.on('message', function(data) {
//         const message = JSON.parse(data);
//         debugger;


//         switch (message.type) {
//             case 'login':
//                 const id = uuidv4();
//                 console.log(id);
//                 db.get('users').push({id: id, userName: message.message, userNickName: message.pseudoname}).write();

//                 const response = {
//                     type: 'login',
//                     responseBody: id
//                 }

//                 wsParams.send(JSON.stringify(response));
//                 break;
//         }
//     })
// });

//Смелюков (видос часть 2)

// const http = require('http');
// const index = require('ws');

// const server = http.createServer((req, res) => {
//     res.end('ok');
// });

// const wss = new index.Server({ server });
// const connections = new Map();

// wss.on('connection', (socket) => {
//     connections.set(socket, {});

//     socket.on('message', (messageData) => {
//         const message = JSON.parse(messageData);
//         let excludeItself = false;

//         if (message.type === "hello") {
//             excludeItself = true;
//             connections.get(socket).userName = message.data.name;
//             sendMessageTo(
//                 {
//                     type: 'user-list',
//                     data: [...connections.values()].map((item) => item.userName).filter(Boolean),
//                 },
//                 socket
//             );
//         }

//         sendMessageFrom(connections, message, socket, excludeItself);
//     });

//     socket.on('close', () => {
//         sendMessageFrom(connections, { type = 'bye-bye' }, socket);
//         connections.delete(socket);
//     });
// });

// function sendMessageTo(message, to) {
//     to.send(JSON.stringify(message))
// }

// function sendMessageFrom(connections, message, from, excludeSelf) {
//     const socketData = connections.get(from);

//     if (!socketData) {
//         return;
//     }

//     message.from = socketData.userName;

//     for (const connection of connections.keys()) {
//         if (connection === from && excludeSelf) {
//             continue;
//         }

//         connection.send(JSON.stringify(message));

//     }
// }

// server.listen(1234);