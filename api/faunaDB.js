let faunadb = require('faunadb')

let q = faunadb.query
var client = new faunadb.Client({ secret: 'fnADwwRDRlACEuzWZztZYPk7ShoLwUuwQ7gxyuBE' })

export {client,q}