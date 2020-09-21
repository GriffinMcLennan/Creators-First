import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyADHnMUSg07bLr45VwZgfFVDQx0I3dL7Oc",
    authDomain: "creatorsfirst-d3fc4.firebaseapp.com",
    databaseURL: "https://creatorsfirst-d3fc4.firebaseio.com",
    projectId: "creatorsfirst-d3fc4",
    storageBucket: "creatorsfirst-d3fc4.appspot.com",
    messagingSenderId: "488189229258",
    appId: "1:488189229258:web:67cb6a2bf9237b8f5bdc33",
    measurementId: "G-2D3DQCH4XM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;
