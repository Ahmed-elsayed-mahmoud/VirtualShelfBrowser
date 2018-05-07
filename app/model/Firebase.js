import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAHoV0DB0UkwUDP38MdHSNg-0_s2SkcaUY",
    authDomain: "bookshelf-2c956.firebaseapp.com",
    databaseURL: "https://bookshelf-2c956.firebaseio.com",
    projectId: "bookshelf-2c956",
    storageBucket: "bookshelf-2c956.appspot.com",
    messagingSenderId: "439709646334"
};

export default firebase.initializeApp(config);