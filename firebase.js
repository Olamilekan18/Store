// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCR2pEyVvetj-6Z1EQZw5H_YnTWD4o_B7o",
    authDomain: "store-6d53d.firebaseapp.com",
    projectId: "store-6d53d",
    storageBucket: "store-6d53d.appspot.com",
    messagingSenderId: "165744726702",
    appId: "1:165744726702:web:319c8de4b8cdf383ce133f",
    measurementId: "G-LYD3GY7TRV"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
