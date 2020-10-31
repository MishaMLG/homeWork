import "../styles/main.scss";
import "../js/modules/client.js";

import MainChat from './mainChat.js'

new MainChat()
const closeAuthor = document.querySelector(".photo-load__close");
const photoLoadMenu = document.querySelector(".photo-load");

const addPhotoWrap = document.querySelector(".photo-load__image-wrap");

closeAuthor.addEventListener('click', () => {
   photoLoadMenu.style.display = "none";
})

addPhotoWrap.addEventListener('click', () => {

})


const btn = document.querySelector('.authorization__btn');
const auth = document.querySelector('.authorization');
const chatBlock = document.querySelector('.chat-section');

btn.addEventListener('click', (e) => {
   e.preventDefault();
   setTimeout(() => {
      auth.style.display = "none";
   }, 500);
})