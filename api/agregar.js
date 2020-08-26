const { crearCita } = require("./firebase");
const url = require('url');

module.exports = (req, res) => {
  let body = req.body
  console.log(body);
  const data = {
    fecha: Date.parse(body.fecha),
    inicio: body.inicio,
    fin: body.fin
  }


  crearCita(data).then(response => {
    console.log(res);
    res.status(200).send(response)
  }).catch(reason => {

    res.status(500).send(reason)
  })

}