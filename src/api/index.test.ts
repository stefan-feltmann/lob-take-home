import e from 'express'

let request = require('supertest')
let server = require('./index')
jest.setTimeout(50000)

describe('express REST test', () => {
  // let server
  beforeEach(function () {
    // server = require('./index')
  })
  afterAll(function () {
    server.close()
  })
  test('basic', async () => {
    await request(server)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.text).toMatchSnapshot()
      })
      .catch((err) => {
        expect(err).toBeNull()
      })
    await request(server)
      .get('/bad')
      .expect(404)
      .then((response) => {
        expect(response.text).toMatchSnapshot()
      })
      .catch((err) => {
        expect(err).toBeNull()
      })
  })
  test('addressesByStreetNumber', async () => {
    await request(server)
      .get('/addressesByStreetNumber?street=1600')
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text)).toMatchSnapshot()
      })
      .catch((err) => {
        expect(err).toBeNull()
      })
    await request(server)
      .get('/addressesByStreetNumber?street=Suite 20')
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text)).toMatchSnapshot()
      })
      .catch((err) => {
        expect(err).toBeNull()
      })
  })
  test('addressesByState', async () => {
    await request(server)
      .get('/addressesByState?state=MD')
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text)).toMatchSnapshot()
      })
      .catch((err) => {
        expect(err).toBeNull()
      })
  })
})
