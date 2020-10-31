export default class loginWindow {
   constructor(element, onLogin) {
      this.element = element;
      this.onLogin = onLogin;

      const loginNickNameInput = document.querySelector('[data-role=login-nickname-input]');
      const submitButton = document.querySelector('[data-role=login-submit]');
      const loginError = document.querySelector('[data-role=login-error]');

      submitButton.addEventListener('click', () => {
         loginError.textContent = '';
         const nickname = loginNickNameInput.value.trim();

         if (!nickname) {
            loginError.textContent = 'Введите Nickname!'
         } else {
            this.onLogin(nickname);
         }
      });

   }

   show() {
      this.element.classList.remove('hidden');
   }

   hide() {
      this.element.classList.add('hidden');
   }
} 