const { crearCita } = require("./firebase");

module.exports = (req, res) => {
  let body = req.body
  console.log(body);
  const data = {
    fecha: Date.parse(body.fecha),
    inicio: body.inicio,
    fin: body.fin
  }

  console.log(data);
  

  crearCita(data).then(response => {
    console.log(res);
    res.status(200).send(response)
  }).catch(reason => {

    res.status(500).send(reason)
  })
}