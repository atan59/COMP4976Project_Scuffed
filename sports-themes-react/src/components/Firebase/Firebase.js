import firebase from 'firebase';
import { postCoachUser, postPlayerUser } from '../ApiActions/ApiActions';

const firebaseConfig = {
    apiKey: "AIzaSyBtCTzc_UIb6v_bwt_2eY-nxifqZw8Qx80",
    authDomain: "sportsthemesfirebase.firebaseapp.com",
    projectId: "sportsthemesfirebase",
    storageBucket: "sportsthemesfirebase.appspot.com",
    messagingSenderId: "1045509692193",
    appId: "1:1045509692193:web:69351efe948eeedfc1fc60"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const signIn = async (email, password) => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        return user;
    } catch (e) {
        console.error(e);
        return;
    }
}

const registerWithEmailAndPassword = async (email, password, form) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;

        await db.collection("users").add({
            uid: user.uid,
            name: form.name,
            role: form.role,
            position: form.position,
            authProvider: "local",
            email
        });
        const coachInfo = { name: form.name }
        const playerInfo = { name: form.name, position: form.position }

        if (form.role === 'Coach') {
            await postCoachUser(user.uid, coachInfo);
            return;
        }

        await postPlayerUser(user.uid, playerInfo);

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const logout = () => {
    auth.signOut();
}

export {
    auth,
    db,
    signIn,
    registerWithEmailAndPassword,
    logout
};