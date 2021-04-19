import express from 'express'
import logger from '../common/logger'
import { AddressConnection } from '../data/addressConnection'

const app = express()
const port = 3000
let addressConnection: AddressConnection

export const authentication = (req, res, next) => {
  /*
    Authentication code would go here
  */
  let badAuth = false
  if (badAuth) {
    return res.status(401).json({
      status: 401,
      message: 'UNAUTHORIZED',
    })
  } else {
    next()
  }
}

app.get('/', authentication, async (req, res) => {
  res.status(200).send('')
})

app.get(
  '/addressesByState',
  authentication,
  async (req, res): Promise<void> => {
    const stateQuery = 'state'
    let state = queryValues(req, stateQuery)
    const output = await addressConnection.queryState(state)
    res.status(200).send(output)
  }
)

app.get('/addressesByStreetNumber', authentication, async (req, res) => {
  const streetQuery = 'street'
  let street = queryValues(req, streetQuery)
  const output = await addressConnection.queryStreetNumber(street)
  res.status(200).send(output)
})

let server = app.listen(port, () => {
  addressConnection = new AddressConnection()
  console.log(`Listening at http://localhost:${port}`)
})

function queryValues(req, stateQuery: string) {
  let state = ''
  if (req.query && req.query[stateQuery]) {
    state = (req.query[stateQuery] as unknown) as string
  }
  return state
}

module.exports = server
