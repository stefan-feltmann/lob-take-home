import express from 'express'
import logger from '../common/logger'
import { AddressConnection } from '../data/addressConnection'

const app = express()
const port = 3000
let addressConnection: AddressConnection

app.get('/', (req, res) => {
  logger.info('Hello World!')
  res.send('Hello World!')
})

app.get('/addressesByState', (req, res) => {
  addressConnection.queryState('MD')
  res.send('Addresses')
})

app.listen(port, () => {
  addressConnection = new AddressConnection()
  console.log(`Example app listening at http://localhost:${port}`)
})
