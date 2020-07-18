let faunadb = require('faunadb')

let q = faunadb.query
var client = new faunadb.Client({ secret: 'fnADwwRDRlACEuzWZztZYPk7ShoLwUuwQ7gxyuBE' })

module.exports = (req, res) => {
    client.query(
        q.Get(q.Ref(q.Class('calendar'),"271065471438029312"))
        // q.Get(q.Equals(q.Class('calendar.fecha'),"2020-07-14T23:11:02.064Z"))
    ).then((ret) => {
        console.log("Resultado: " + ret)
        res.status(200).send(ret)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}