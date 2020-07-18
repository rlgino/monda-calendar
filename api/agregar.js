import {client,q} from './faunaDB'

module.exports = (req, res) => {
  let body = req.body
  console.log(body);

  client.query(
    q.Create(
      q.Collection('calendar'),
      { data: { 
        fecha: body.fecha,
        inicio: body.inicio,
        fin: body.fin
       } }
    )
  ).then(result => {
    console.log(res);
    res.status(200).send(result.ts)
  }).catch(reason => {
    console.error(reason);
    res.status(500).send(reason)
  })
}