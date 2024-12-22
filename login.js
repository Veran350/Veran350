// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFyzUobF12L-QlVnklN-2uYKvhwqXdkyE",
    authDomain: "veran350-b6c53.firebaseapp.com",
    projectId: "veran350-b6c53",
    storageBucket: "veran350-b6c53.firebasestorage.app",
    messagingSenderId: "727775684680",
    appId: "1:727775684680:web:80f53b3b9c4ec3b6b1107d",
    measurementId: "G-EQE584VHBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => alert(error.message));
});
