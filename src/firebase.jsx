// Import the necessary functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWhgNPD1IW7CXBnotZ8Mazt4vHGSunR5U",
  authDomain: "poweredu-ecc50.firebaseapp.com",
  projectId: "poweredu-ecc50",
  storageBucket: "poweredu-ecc50.appspot.com",
  messagingSenderId: "986100396774",
  appId: "1:986100396774:web:f65aad98a01340892c0127",
  measurementId: "G-PV3S90F2RJ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Function to register the service worker for Firebase Cloud Messaging
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
};

// Function to request permission for notifications and get FCM token
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'rFjqmHBWpuCbJaYdU60QOeDuTfaxLXqd_NCsBR7pzwA' });
      
      // Send the token to your server to save it
    } else {
      console.warn('Notification permission denied');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

// Handle incoming messages while the app is in the foreground
onMessage(messaging, (payload) => {
  
  // Customize notification handling here
});

// Export the messaging and service worker registration functions
export { messaging, registerServiceWorker, requestNotificationPermission };