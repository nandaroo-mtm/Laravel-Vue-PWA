importScripts("https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAfACbZ8WlG_2V2w0R9r6BWJQTmuN7qwew",
  authDomain: "blog-92669.firebaseapp.com",
  projectId: "blog-92669",
  storageBucket: "blog-92669.appspot.com",
  messagingSenderId: "928269993401",
  appId: "1:928269993401:web:d1df8cdcaf84790457a268",
  measurementId: "G-QJ8B0E4W25",
};

firebase.initializeApp(firebaseConfig);

firebase.messaging();