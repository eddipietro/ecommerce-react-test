import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAgnb5YtOcC-TAlxkmIWvF9Z4tAyFTHCvY",
  authDomain: "ecommerce-test-react.firebaseapp.com",
  projectId: "ecommerce-test-react",
  storageBucket: "ecommerce-test-react.appspot.com",
  messagingSenderId: "938188767927",
  appId: "1:938188767927:web:a58e3b5fdc081010b28332"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
