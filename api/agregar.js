const { crearCita } = require("./firebase");
const url = require('url');

module.exports = (req, res) => {
  let body = req.body
  console.log(body);
  const data = {
    fecha: Date.parse(body.fecha),
    inicio: body.inicio,
    fin: body.fin,
    titulo: body.titulo,
    descripcion: body.descripcion
  }
  const queryObject = url.parse(req.url, true).query;
  const userID = queryObject.user_id;
  crearCita(data, userID).then(response => {
    res.status(200).send(response)
  }).catch(reason => {
    res.status(500).send(reason)
  })

}