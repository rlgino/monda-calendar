import { consultarCita } from '../src/firebase/firebase'
const url = require('url');

module.exports = (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const userID = queryObject.user_id;
    const encodedDate = queryObject.fecha;
    consultarCita(userID, encodedDate).then(result => {
        if (result === null || result === undefined) {
            res.status(200).send([])
        } else {
            res.status(200).send(result)
        }
    }).catch(reason => {
        res.status(500).send(reason)
    })
}