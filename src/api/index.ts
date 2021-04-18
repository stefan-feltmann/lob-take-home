import express from 'express'
import logger from '../common/logger'
import querystring from 'querystring'
import { AddressConnection } from '../data/addressConnection'

const app = express()
const port = 3000
let addressConnection: AddressConnection

app.get('/', async (req, res) => {
  logger.info('Hello World!')
  res.status(200).send('Hello World!')
})

app.get(
  '/addressesByState',
  async (req, res): Promise<void> => {
    const stateQuery = 'state'
    let state = queryValues(req, stateQuery)
    const output = await addressConnection.queryState(state)
    res.status(200).send(output)
  }
)

app.get('/addressesByStreetNumber', async (req, res) => {
  const streetQuery = 'street'
  let street = queryValues(req, streetQuery)
  const output = await addressConnection.queryStreetNumber(street)
  res.status(200).send(output)
})

let server = app.listen(port, () => {
  addressConnection = new AddressConnection()
  console.log(`Example app listening at http://localhost:${port}`)
})

function queryValues(req, stateQuery: string) {
  let state = ''
  if (req.query && req.query[stateQuery]) {
    state = (req.query[stateQuery] as unknown) as string
  }
  return state
}

module.exports = server
