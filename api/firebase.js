const firebase = require('firebase')
const database = require('firebase/database')

var firebaseConfig = {
    apiKey: "AIzaSyCfUWQ9_arx7AB9ji9p4SHmSO2ejp79c-Y",
    authDomain: "monda-calendar.firebaseapp.com",
    databaseURL: "https://monda-calendar.firebaseio.com",
    projectId: "monda-calendar",
    storageBucket: "monda-calendar.appspot.com",
    messagingSenderId: "440530510753",
    appId: "1:440530510753:web:38b8597cfedb57742f21e0"
};

firebase.initializeApp(firebaseConfig)

var db = firebase.database()

const crearCita = (cita) => {
    return firebase.database().ref('citas/' + cita.fecha).set({
        fecha: cita.fecha,
        desde: cita.inicio,
        hasta: cita.fin
    });
}

export { crearCita }