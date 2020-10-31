const { Server } = require('ws');
const http = require('http');

function readBody(req) {
   return new Promise((resolve, reject) => {
      let dataRaw = '';
      req.on('data', (chunk) => (dataRaw += chunk));
      req.on('error', reject);
      req.on('end', () => resolve(JSON.parse(dataRaw)));
   })
}

const server = http.createServer(async (req, res) => {
   try {
      if (/\/photos\/.+\.png/.test(req.url)) {
         const [, imageName] = req.url.match(/\/photos\/(.+\.png)/) || []
         const fallBackPath = path.resolve(__dirname, '../no-photo.png');
         const filePath = path.resolve(__dirname, '../photos'.imageName);

         if (fs.existsSync(filePath)) {
            return fs.createReadStream(filePath).pipe(res);
         } else {
            return fs.createReadStream(fallBackPath).pipe(res);
         }
      } else if (req.url.endsWith('/upload-photo')) {
         const body = await readBody(req);
         const name = body.name.replace(/\.\.\/|\//, '');
         const [, content] = body.image.match(/data:image\/.+?;base64,(.+)/) || [];
         const filePath = path.resolve(__dirname, '../photos', `${name}.png`)

         if (name && content) {
            fs.writeFileSync(filePath, content, 'base64');

            broadcast(connections, { type: 'photo-changed', data: { name } });
         } else {
            return res.end('fail')
         }
      }

      res.end('ok');
   } catch (e) {
      console.error(e);
      res.end('fail');

   }
})
const wss = new Server({ server });
const connections = new Map();

wss.on('connection', (socket) => {
   connections.set(socket, {});

   socket.on('message', (messageData) => {
      const message = JSON.parse(messageData);
      let excludeItself = false;

      if (message.type === "hello") {
         excludeItself = true;
         connections.get(socket).nickName = message.data.name;
         console.log(message.data)
         sendMessageTo(
            {
               type: 'user-list',
               data: [...connections.values()].map((item) => item.nickName).filter(Boolean)
            },
            socket
         );
      }

      if (message.type === "bye-bye") {

      }
      sendMessageFrom(connections, message, socket, excludeItself)
   });

   socket.on('close', () => {
      sendMessageFrom(connections, { type: 'bye-bye' }, socket);
      connections.delete(socket);
   });
});



function sendMessageTo(message, to) {
   to.send(JSON.stringify(message))
}

function broadcast(connections, message) {
   for (const connection of connections.keys()) {
      connection.send(JSON.stringify(message));
   }
}

function sendMessageFrom(connections, message, from, excludeSelf) {
   const socketData = connections.get(from);

   if (!socketData) {
      return;
   }

   console.log(socketData, "это нужная хуйня")
   message.from = socketData.nickName;

   for (const connection of connections.keys()) {
      if (connection === from && excludeSelf) {
         continue;
      }

      connection.send(JSON.stringify(message));

   }
}

server.listen(1234, () => {
   console.log("Server run");
});