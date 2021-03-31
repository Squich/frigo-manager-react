import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_HEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // Inscription
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    // Connexion
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // Déconnexion
    signoutUser = () => this.auth.signOut();

    // Récupération mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    // Récupération du document Firestore d'un utilisateur
    userDoc = uid => this.db.doc(`users/${uid}`);

    // Modifier l'adresse email d'un utilisateur
    updateEmail = email => this.auth.currentUser.updateEmail(email);

    // Modifier le mot de passe d'un utilisateur
    updatePassword = password => this.auth.currentUser.updatePassword(password);

    // Suppression d'un utilisateur
    deleteUser = () => this.auth.currentUser.delete();

    // Suppression du document Firestore associé à un utilisateur
    deleteUserDoc = uid => this.db.doc(`users/${uid}`).delete();

}

export default Firebase;