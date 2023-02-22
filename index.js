const bodyParser = require('body-parser')
const express = require('express')
const { User } = require('./models/user')
const users = require('./routes/usuarios')
const app = express()
const port = 3000
const YAML = require('yaml')
const fs = require('fs')
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use('/users', users);
User.sync();

const swaggerUi = require('swagger-ui-express');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})