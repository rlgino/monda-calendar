import { revertDate } from '../utils';
import { v4 as uuidv4 } from 'uuid';

const firebase = require('firebase')
require('firebase/database')
require('firebase/auth')

var firebaseConfig = {
    apiKey: "AIzaSyCfUWQ9_arx7AB9ji9p4SHmSO2ejp79c-Y",
    authDomain: "monda-calendar.firebaseapp.com",
    databaseURL: "https://monda-calendar.firebaseio.com",
    projectId: "monda-calendar",
    storageBucket: "monda-calendar.appspot.com",
    messagingSenderId: "440530510753",
    appId: "1:440530510753:web:38b8597cfedb57742f21e0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const signIn = (user, password) => {
    return firebase.auth().signInWithEmailAndPassword(user, password);
}

const signOut = () => {
    return firebase.auth().signOut();
}

const signUp = (user, passowrd) => {
    return firebase.auth().createUserWithEmailAndPassword(user, passowrd)
}

const onAuthStateChange = (func) => {
    return firebase.auth().onAuthStateChanged(func)
}

/**
 * Método para guardar citas
 * @param {Cita} cita Cita a guardar en DB
 * @param {number} userID ID del usuario que agendó la cita
 * @param {Date} fecha Fecha de la cita a guardar
 */
const crearCita = (cita, userID, fecha) => {
    const revertedDate = revertDate(fecha)
    const uuid = uuidv4()
    console.log(`Dando de alta: [citas/${userID}/${revertedDate}/${uuid}]`);
    return firebase.database().ref(`citas/${userID}/${revertedDate}/${uuid}`).set({
        fecha: cita.fecha,
        desde: cita.inicio,
        hasta: cita.fin,
        titulo: cita.titulo,
        descripcion: cita.descripcion
    });
}

/**
 * 
 * @param {number} userID ID del usuario dueño de la cita
 * @param {String} fecha Fecha string de las citas a consultar (formato YYYY/MM/DD)
 */
const consultarCita = (userID, fecha) => {
    return firebase.database().ref(`citas/${userID}/${fecha}/`).once('value').then(snapshot => {
        return snapshot.val()
    })
}

export { crearCita, consultarCita, signIn, signUp, signOut, onAuthStateChange }