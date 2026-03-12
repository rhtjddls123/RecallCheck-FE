importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA6plLV8kQX1YWRcAAM1jiwpAxlQrdPVlI",
  authDomain: "recall-check-78b07.firebaseapp.com",
  projectId: "recall-check-78b07",
  storageBucket: "recall-check-78b07.firebasestorage.app",
  messagingSenderId: "642625414870",
  appId: "1:642625414870:web:aefd6211570bce29c98b77"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/icon.png"
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // 클릭 시 이동할 페이지
  );
});
