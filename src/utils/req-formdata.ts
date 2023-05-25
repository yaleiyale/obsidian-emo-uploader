import { RANDOM_BOUNDARY } from '../base/constants'
import { getArrayBuffer } from './file-helper'

export class ReqFormData {
  private result: any[]
  private readonly randomBoundary = RANDOM_BOUNDARY
  private readonly boundary: string
  private readonly endBoundary: string
  constructor () {
    this.result = []
    this.boundary = '--' + this.randomBoundary
    this.endBoundary = this.boundary + '--'
  }

  async add (name: string, value: string | File): Promise<void> {
    let data = this.boundary + '\r\n'
    if (typeof value === 'string') { // add parameters
      data += 'Content-Disposition: form-data; name="' + name + '"\r\n\r\n'
      data += value + '\r\n'
      for (let i = 0; i < data.length; i++) {
        this.result.push(data.charCodeAt(i))
      }
    } else if (value instanceof File) { // add files
      data += 'Content-Disposition: form-data; name="' + name + '"; filename="' + value.name + '"\r\n'
      data += 'Content-Type: ' + value.type + '\r\n\r\n'
      for (let i = 0; i < data.length; i++) {
        this.result.push(data.charCodeAt(i))
      }
      await getArrayBuffer(value).then((fileBuffer) => {
        const fileArray = new Uint8Array(fileBuffer)
        this.result = this.result.concat(Array.prototype.slice.call(fileArray))
      })
      const endTag = '\r\n'
      for (let i = 0; i < endTag.length; i++) {
        this.result.push(endTag.charCodeAt(i))
      }
    }
  }

  pack (): ArrayBuffer {
    const endBoundaryArray = []
    for (let i = 0; i < this.endBoundary.length; i++) { // write terminator
      endBoundaryArray.push(this.endBoundary.charCodeAt(i))
    }
    this.result = this.result.concat(endBoundaryArray)
    return new Uint8Array(this.result).buffer
  }
}
