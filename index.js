const express = require('express');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
// 	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
// 	next();
// });

const whitelist = ['http://127.0.0.1:5500']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})

routerApi(app);

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)



app.listen(port)
console.log('Server on 3000');




