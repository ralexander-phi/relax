(function() {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

  document.getElementById('audio').addEventListener('play', function() {
    document.getElementById('enable-audio').remove();
    startAudio();
  }, false);
})();

