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

  addParm (name: string, value: string): void {
    let data = this.boundary + '\r\n'
    data += 'Content-Disposition: form-data; name="' + name + '"\r\n\r\n'
    data += value + '\r\n'
    for (let i = 0; i < data.length; i++) {
      this.result.push(data.charCodeAt(i))
    }
  }

  async addFile (name: string, file: File): Promise<void> {
    let data = this.boundary + '\r\n'
    data += 'Content-Disposition: form-data; name="' + name + '"; filename="' + file.name + '"\r\n'
    data += 'Content-Type: ' + file.type + '\r\n\r\n'
    for (let i = 0; i < data.length; i++) {
      this.result.push(data.charCodeAt(i))
    }
    await getArrayBuffer(file).then((picBuffer) => {
      const picArray = new Uint8Array(picBuffer)
      this.result = this.result.concat(Array.prototype.slice.call(picArray))
    })
    const endTag = '\r\n'
    for (let i = 0; i < endTag.length; i++) {
      this.result.push(endTag.charCodeAt(i))
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
