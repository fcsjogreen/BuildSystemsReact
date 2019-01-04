import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCZspbXsxdvAZEjYnUxqLoWves0IeuPeFU",
    authDomain: "bodega-e4925.firebaseapp.com",
    databaseURL: "https://bodega-e4925.firebaseio.com",
    projectId: "bodega-e4925",
    storageBucket: "bodega-e4925.appspot.com",
    messagingSenderId: "197587334934"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
