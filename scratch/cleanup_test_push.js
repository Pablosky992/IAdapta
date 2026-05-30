import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, deleteField } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3teph1wXtdLCnW7ao132Z2atCSxQTEq0",
  authDomain: "iadapta-1a0fb.firebaseapp.com",
  databaseURL: "https://iadapta-1a0fb-default-rtdb.firebaseio.com",
  projectId: "iadapta-1a0fb",
  storageBucket: "iadapta-1a0fb.firebasestorage.app",
  messagingSenderId: "997653142459",
  appId: "1:997653142459:web:2017ed637e4d5e773b829e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanup() {
  const emailHash = "29eb23c0d72dfc7cac4cf2c5e01aeae1d5a93f2544eb5ce4ce34e63aad507dcf";
  console.log(`Cleaning up test document: ${emailHash}`);
  
  try {
    const docRef = doc(db, "daily_challenge_streaks", emailHash);
    
    // Restore original state
    await updateDoc(docRef, {
      last_date: "2026-05-30",
      push_subscription: deleteField(),
      notifications_enabled: deleteField(),
      updated_at: new Date().toISOString()
    });
    
    console.log("Cleanup completed successfully! Original streak state restored.");
  } catch (err) {
    console.error("Cleanup failed:", err);
  }
}

cleanup();
