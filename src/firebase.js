import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB0avDlRlo2eBwaI0QMbrCIvFBnBDN8wpI",
    authDomain: "whatsupclone-44b1b.firebaseapp.com",
    projectId: "whatsupclone-44b1b",
    storageBucket: "whatsupclone-44b1b.appspot.com",
    messagingSenderId: "31038165833",
    appId: "1:31038165833:web:b83ef6ac233e0537364098"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;
