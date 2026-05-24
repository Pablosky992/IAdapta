import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import webpush from 'web-push';

// Firebase Configuration (matches client)
const firebaseConfig = {
  apiKey: "AIzaSyA3teph1wXtdLCnW7ao132Z2atCSxQTEq0",
  authDomain: "iadapta-1a0fb.firebaseapp.com",
  databaseURL: "https://iadapta-1a0fb-default-rtdb.firebaseio.com",
  projectId: "iadapta-1a0fb",
  storageBucket: "iadapta-1a0fb.firebasestorage.app",
  messagingSenderId: "997653142459",
  appId: "1:997653142459:web:2017ed637e4d5e773b829e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Configure VAPID keys for Web Push
webpush.setVapidDetails(
  'mailto:iadaptato@gmail.com',
  'BMYMyTsyO73fZSOP6B5HJP0Ii2YNFx4aFg4kIMaB830gpOv7vYhNF0xi7g9HhK50CZAPsezb9sDHcKVQxEBMS-k', // Public Key
  'POVdO0SFh200XwLUj1yXQncRsgfaCj5n5ISPzbawcKY' // Private Key
);

async function sendReminders() {
  console.log("Starting daily challenge reminders dispatch...");
  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const querySnapshot = await getDocs(collection(db, "daily_challenge_streaks"));
    
    let sentCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      
      // Check if notifications are enabled and push subscription is present
      if (data.notifications_enabled && data.push_subscription) {
        // If they haven't completed the challenge today
        if (data.last_date !== todayStr) {
          try {
            const subscription = JSON.parse(data.push_subscription);
            await webpush.sendNotification(subscription, JSON.stringify({
              title: 'Reto Diario IAdapta 🧠',
              body: '¡No pierdas tu racha! Entrena tu mente completando los 3 juegos de hoy.'
            }));
            console.log(`[Success] Notification sent to device: ${doc.id}`);
            sentCount++;
          } catch (err) {
            console.error(`[Error] Failed to send notification to device ${doc.id}:`, err.message);
            failCount++;
          }
        } else {
          console.log(`[Skip] Device ${doc.id} already completed today's challenge.`);
          skipCount++;
        }
      }
    }
    
    console.log(`Dispatch completed. Sent: ${sentCount}, Failed: ${failCount}, Skipped: ${skipCount}`);
  } catch (error) {
    console.error("Fatal error during reminders dispatch:", error);
    process.exit(1);
  }
}

sendReminders();
