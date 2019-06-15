if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('load');
    console.log(navigator.serviceWorker.controller);
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      console.log(navigator.serviceWorker.controller);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
    setTimeout(() => {
      const img = new Image();
      img.src = '/cycle.png';
      document.body.appendChild(img);
    }, 3000);
  });
}