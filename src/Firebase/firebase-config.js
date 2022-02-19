import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBJ3oJMKeK66i6sMdYo3mYJfiDlgEcwgnc",
  authDomain: "koobenauth.firebaseapp.com",
  projectId: "koobenauth",
  storageBucket: "koobenauth.appspot.com",
  messagingSenderId: "882657810395",
  appId: "1:882657810395:web:77a39395929a88d6cb79fe"

};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();


export {
    db,
    facebookAuthProvider,
    firebase
}