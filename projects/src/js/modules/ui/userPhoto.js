export default class UserPhoto {
   constructor(element, onUpload) {
      this.element = element;
      this.onUpload = onUpload;

      this.element.addEventListener('dragover', (e) => {
         if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === "file") {
            e.preventDefault();
         }
      });
      console.log(this.element);
      this.element.addEventListener('drop', (e) => {
         e.preventDefault();
         const file = e.dataTransfer.items[0].getAsFile();
         const reader = new FileReader();

         reader.readAsDataURL(file);
         console.log(file);
         reader.addEventListener('load', () => this.onUpload(reader.result));
      });
   }

   set(photo) {
      this.element.style.backgroundImage = `url(${photo})`;
   }
}