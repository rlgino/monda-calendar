import { consultarCita } from './firebase'
const url = require('url');

module.exports = (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const userID = queryObject.user_id;
    consultarCita(userID).then(result => {
        console.log(result);
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}