const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

/*app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log( );
});*/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`App is now listening on port ${port}!`);
});
