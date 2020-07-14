module.exports = (req, res) => {
  let body = req.body
  console.log(body.fecha);  
  res.status(200).send(`Hello Gino!`)
}