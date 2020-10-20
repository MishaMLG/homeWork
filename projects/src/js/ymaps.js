function mapInit() {
   ymaps.ready(() => {
      let myMap = new ymaps.Map('map', {
         center: [55.76, 37.64],
         zoom: 11
      });
   })
}

export {
   mapInit
}