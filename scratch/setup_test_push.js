import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

// Mock push subscription object (structure matches browser PushSubscription)
const mockSubscription = {
  endpoint: "https://fcm.googleapis.com/fcm/send/fN_mock_endpoint_123456",
  keys: {
    p256dh: "BEl96_mock_key_p256dh_value_abc123_xyz789_def456_ghi789",
    auth: "mock_auth_key_12345=="
  }
};

async function setupTestDoc() {
  const emailHash = "29eb23c0d72dfc7cac4cf2c5e01aeae1d5a93f2544eb5ce4ce34e63aad507dcf"; // pnarciso92@gmail.com
  console.log(`Setting up test document in Firestore for hash: ${emailHash}`);
  
  try {
    const docRef = doc(db, "daily_challenge_streaks", emailHash);
    await setDoc(docRef, {
      email: "pnarciso92@gmail.com",
      streak: 2,
      last_date: "2026-05-29", // Yesterday, so reminder should trigger
      history: [
        "2026-05-13", "2026-05-14", "2026-05-15",
        "2026-05-24", "2026-05-25", "2026-05-26",
        "2026-05-27", "2026-05-29"
      ],
      notifications_enabled: true,
      push_subscription: JSON.stringify(mockSubscription),
      updated_at: new Date().toISOString()
    }, { merge: true });
    
    console.log("Mock push subscription and notifications state written successfully!");
  } catch (err) {
    console.error("Failed to write mock data:", err);
  }
}

setupTestDoc();
