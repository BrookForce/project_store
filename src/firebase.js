import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA5NWs_McrHx6z5l7cwhKAc2Y6RVx81YyA",
    authDomain: "projectstore-9459e.firebaseapp.com",
    projectId: "projectstore-9459e",
    storageBucket: "projectstore-9459e.appspot.com",
    messagingSenderId: "909237399622",
    appId: "1:909237399622:web:c569522b4546d4a3229a47"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, onAuthStateChanged };

    