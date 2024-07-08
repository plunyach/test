import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyBSLJK94PxGbW7twIVk2_iX2oGHKadmhm4",
	authDomain: "sizeupp-428b3.firebaseapp.com",
	projectId: "sizeupp-428b3",
	storageBucket: "sizeupp-428b3.appspot.com",
	messagingSenderId: "736652947011",
	appId: "1:736652947011:web:16e522a587e80626f32ef6",
	measurementId: "G-11YNRWTLWX"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);