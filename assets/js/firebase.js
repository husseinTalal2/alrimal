const firebaseConfig = {
    apiKey: "AIzaSyCLyOz0WdJq5WMGHh69bbVtyc5u1eZjRxA",
    authDomain: "alrimal-aldhahabiya.firebaseapp.com",
    projectId: "alrimal-aldhahabiya",
    storageBucket: "alrimal-aldhahabiya.appspot.com",
    messagingSenderId: "66187503475",
    appId: "1:66187503475:web:6fe59dd001c4bf87ee8706",
    measurementId: "G-6B781076VH",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const storage = firebase.storage()