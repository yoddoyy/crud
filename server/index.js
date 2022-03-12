const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')


const app = express()

app.use(cors())
app.use(require('./middleware/db'))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.config = config
  next()
})

app.get('/', (req, res, next) => {
    res.send('ok');
  });

app.use('/api', require('./api'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(config.server.port, () => {
  console.log('server listen on', config.server.port)
})