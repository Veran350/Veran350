// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtV0SOxHn_P3KYy8rV4IpgYhKvrtqddLc",
    authDomain: "maoelementary-c6e57.firebaseapp.com",
    projectId: "maoelementary-c6e57",
    storageBucket: "maoelementary-c6e57.appspot.com",
    messagingSenderId: "471682560547",
    appId: "1:471682560547:web:your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign up functionality
document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Sign-up successful!");
            window.location.href = "shop.html"; // Redirect to shop page
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
});

// Sign in functionality
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "shop.html"; // Redirect to shop page
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
});
