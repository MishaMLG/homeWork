export default class MessageSender {
   constructor(element, onSend) {
      this.onSend = onSend;
      this.messageInput = document.querySelector('[data-role=message-input]')
      this.messageSendButton = document.querySelector('[data-role=message-send]')

      this.messageSendButton.addEventListener('click', () => {
         const message = this.messageInput.value.trim();

         if (message) {
            this.onSend(message)
         }
      });
   }

   clear() {
      this.messageInput.value = '';
   }
}