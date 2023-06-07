import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2iJulnlkPe5xj_shKqOgFo-ZfuQqKQA0",
  authDomain: "imagens-694ac.firebaseapp.com",
  projectId: "imagens-694ac",
  storageBucket: "imagens-694ac.appspot.com",
  messagingSenderId: "459699703608",
  appId: "1:459699703608:web:3cbdb34ac5ac7d515abbcd",
  measurementId: "G-M6VZFNZJ7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app');
