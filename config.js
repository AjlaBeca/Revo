import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR8qPYF8PRRnHQJfI7bI_43fJHmppGnl8",
  authDomain: "revo-cb87f.firebaseapp.com",
  projectId: "revo-cb87f",
  storageBucket: "revo-cb87f.appspot.com",
  messagingSenderId: "120340440298",
  appId: "1:120340440298:web:1efed163eec794a6fda393"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};