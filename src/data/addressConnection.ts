import logger from '../common/logger'
import jsonQuery from 'json-query'
import fs from 'fs'

export class AddressConnection {
  private jsonData: any
  constructor() {
    let jsonBuffer = fs.readFileSync('src/data/addresses.json')
    this.jsonData = JSON.parse(jsonBuffer.toString())
  }
  public async queryState(state: string) {
    logger.silly(JSON.stringify(state))
    let queryData = jsonQuery(`[state=${state}]`, {
      data: this.jsonData,
    })

    logger.silly(JSON.stringify(queryData))
    return queryData
  }
}
