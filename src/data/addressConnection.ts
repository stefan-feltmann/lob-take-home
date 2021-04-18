import logger from '../common/logger'
import jsonQuery from 'json-query'
import fs from 'fs'

export class AddressConnection {
  private jsonData: any
  constructor() {
    let jsonBuffer = fs.readFileSync('src/data/addresses.json')
    let clean = {}
    clean['address'] = JSON.parse(jsonBuffer.toString())
    logger.info(clean)
    this.jsonData = clean
  }
  public async queryState(state: string) {
    logger.silly(JSON.stringify(state))
    let queryData = jsonQuery(`address:select(state)`, {
      data: this.jsonData,
      locals: {
        select: function (addresses) {
          let output: any[] = []
          for (const address of addresses) {
            if (address['state'] && address['state'].includes(state)) {
              output.push(address)
            }
          }
          return output
        },
      },
    })

    logger.silly(JSON.stringify(queryData))
    return queryData.value
  }

  public async queryStreetNumber(street: string) {
    logger.silly(JSON.stringify(street))
    let queryData = jsonQuery(`address:select(line1)`, {
      data: this.jsonData,
      locals: {
        select: function (addresses) {
          let output: any[] = []
          for (const address of addresses) {
            if (
              (address['line1'] && address['line1'].includes(street)) ||
              (address['line2'] && address['line2'].includes(street))
            ) {
              output.push(address)
            }
          }
          return output
        },
      },
    })

    logger.silly(JSON.stringify(queryData))
    return queryData.value
  }
}
