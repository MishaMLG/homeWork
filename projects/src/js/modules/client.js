const ws = new WebSocket('ws://localhost:1234');

const btn = document.querySelector('.authorization__btn');
const auth = document.querySelector('.authorization');
const chatBlock = document.querySelector('.chat-section');

btn.addEventListener('click', (e) => {
   e.preventDefault();
   const userName = document.getElementById('nickname').value;
   const userNickName = document.getElementById('nickname').value;
   const request = {
      type: 'login',
      message: userName,
      pseudoname: userNickName
   }

   ws.send(JSON.stringify(request));

   userName.value = '';
   userNickName.value = '';
})


ws.onmessage = function (event) {
   const message = JSON.parse(event.data);
   switch (message.type) {
      case 'login':
         break;
      default:
         break;
   }
}
//
ws.onerror = function (err) {
   console.error(err);
}

ws.onopen = function () {
   console.log('Client Connect');
}

ws.onclose = function () {
   console.log('Server Die');
}
