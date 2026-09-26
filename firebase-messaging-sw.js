// This file must sit in the SAME folder as right-here.html, at the
// site root, and must be named exactly "firebase-messaging-sw.js" —
// the browser looks for it by that name automatically.

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Same config as right-here.html — keep these two in sync if you
// ever change your Firebase project.
firebase.initializeApp({
  apiKey: "AIzaSyA2wqin7hWuBc91RcNqTWl_BKShDqUxPSE",
  authDomain: "online-quiz-a7f40.firebaseapp.com",
  databaseURL: "https://online-quiz-a7f40-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "online-quiz-a7f40",
  storageBucket: "online-quiz-a7f40.firebasestorage.app",
  messagingSenderId: "410078796989",
  appId: "1:410078796989:web:a8ad955ceef10ef348ebd4"
});

const messaging = firebase.messaging();

// Fires when a push arrives while the app/browser is closed or in
// the background. This is what makes the phone buzz without either
// of you having the page open.
messaging.onBackgroundMessage((payload) => {
  const fromName = (payload.data && payload.data.from) || "they";
  self.registration.showNotification(fromName + " is thinking of you 💗", {
    body: "tap to open right here",
    icon: "icon-192.png",
    badge: "icon-192.png",
    vibrate: [90, 60, 90, 60, 260],
    tag: "pulse",
    renotify: true,
    data: { url: "./right-here.html" }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "./right-here.html";
  event.waitUntil(clients.openWindow(url));
});
