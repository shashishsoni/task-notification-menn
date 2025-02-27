import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB8r_VSouUqwMH2TT2-VhRh32FIFHc0fMU",
  authDomain: "notification-d5845.firebaseapp.com",
  projectId: "notification-d5845",
  storageBucket: "notification-d5845.firebasestorage.app",
  messagingSenderId: "847293266860",
  appId: "1:847293266860:web:4159ccab3a47d34375d809",
  measurementId: "G-DRM523VXSL"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY_HERE' // Get this from Firebase Console
      });
      return token;
    }
  } catch (error) {
    console.error('Notification permission error:', error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});