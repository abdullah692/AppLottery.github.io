import firebase from 'firebase/app'
import auth from 'firebase/auth'
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAbbfI0RnYRYE4kQ95F2tM385KgRo6iFm0",
    authDomain: "lottery-app-d6357.firebaseapp.com",
    projectId: "lottery-app-d6357",
    storageBucket: "lottery-app-d6357.appspot.com",
    messagingSenderId: "153738077343",
    appId: "1:153738077343:web:b92f87863a2bded8032eaa"
  };

 const fire = firebase.initializeApp(firebaseConfig);
 export const db= firebase.firestore()
// export  const  auth=firebase.auth()

  export default fire;