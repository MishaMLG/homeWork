import LoginWindow from './modules/ui/loginWindow';
import MainWindow from './modules/ui/MainWindow';
import UserList from './modules/ui/userList';
import UserName from './modules/ui/UserName';
import UserPhoto from './modules/ui/userPhoto';
import MessageList from './modules/ui/messageList';
import MessageSender from './modules/ui/messageSender';
import WSClient from '../../wsClient'

export default class MainChat {
   constructor() {
      this.wsClient = new WSClient(
         `ws://localhost:1234`,
         this.onMessage.bind(this)
      );


      this.ui = {
         loginWindow: new LoginWindow(
            document.querySelector('#loginWindow'),
            this.onLogin.bind(this)
         ),
         mainWindow: new MainWindow(document.querySelector('#mainChat')),
         userName: new UserName(document.querySelector('[data-role=user-name]')),
         userList: new UserList(document.querySelector('[data-role=user-list]')),
         messageList: new MessageList(document.querySelector('[data-role=message-list]')),
         messageSender: new MessageSender(
            document.querySelector('[data-role=message-sender]'),
            this.onSend.bind(this)
         ),
         userPhoto: new UserPhoto(
            document.querySelector('[data-role=user-photo]'),
            this.onUpload.bind(this)
         )
      };
      console.log(document.querySelector('[data-role=user-list]'));
      this.ui.loginWindow.show();
   }

   onUpload(data) {
      this.ui.userPhoto.set(data);

      fetch('img/upload-photo', {
         method: 'post',
         body: JSON.stringify({
            name: this.ui.userName.get(),
            image: data,
         }),
      });
   }

   async onLogin(nickname) {
      await
         this.wsClient.connect();
      this.wsClient.sendHello(nickname);
      this.ui.loginWindow.hide();
      this.ui.mainWindow.show();
      this.ui.userName.set(name);

      // this.ui.userPhoto.set(`/img/upload-photo/${name}.png?t=${Date.now()}`);
   }

   onMessage({ type, from, data }) {
      console.log(type, from, data);

      if (type === "hello") {
         this.ui.userList.add(from);
         this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
      } else if (type === "user-list") {
         for (const item of data) {
            this.ui.userList.add(item);
         }
      } else if (type === "bye-bye") {
         this.ui.userList.remove(from);
         this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
      } else if (type === "message") {
         this.ui.messageList.add(from, data.message);
      } else if (type === "photo-changed") {
         const avatars = document.querySelectorAll(
            `[data-role=user-avatar][data-user=${data.name}]`
         );

         for (const avatar of avatars) {
            avatar.style.backgroundImage = `url(/img/upload-photo/${data.name}
               .png?t=${Data.now()})`;
         }
      }
   }

   onSend(message) {
      this.wsClient.sendTextMessage(message);
      this.ui.messageSender.clear();
   }
}