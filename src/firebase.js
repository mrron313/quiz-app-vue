import firebase from '@firebase/app'
import '@firbase/auth'
import '@firbase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBBCIU0GGrYeXGqVVc3o9tRcHwttL9zQKE",
    authDomain: "ron-test-8259b.firebaseapp.com",
    databaseURL: "https://ron-test-8259b.firebaseio.com",
    projectId: "ron-test-8259b",
    storageBucket: "ron-test-8259b.appspot.com",
    messagingSenderId: "780107221889",
    appId: "1:780107221889:web:2938d557634e1898"
  };

firebase.initializeApp(firebaseConfig)

export default firebase