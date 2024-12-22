// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
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

// Sign-up functionality
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Sign-up successful!");
            window.location.href = "shop.html"; // Redirect to shop page
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
});

// Sign-in functionality
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "shop.html"; // Redirect to shop page
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
});
