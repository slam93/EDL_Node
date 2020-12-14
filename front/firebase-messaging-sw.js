importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyC0axlehX1PhOzp-5N9X6qJtu_rVK_FaoQ",
  authDomain: "girlandcar-ba183.firebaseapp.com",
  databaseURL: "https://girlandcar-ba183.firebaseio.com",
  projectId: "girlandcar-ba183",
  storageBucket: "girlandcar-ba183.appspot.com",
  messagingSenderId: "80771101864",
  appId: "1:80771101864:web:35ccc29c1472483b597e9d",
  measurementId: "G-0WEV6507ZP"
});
const messaging = firebase.messaging();
