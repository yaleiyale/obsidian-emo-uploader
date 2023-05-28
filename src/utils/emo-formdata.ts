import { RANDOM_BOUNDARY } from '../base/constants'
import { getArrayBuffer } from './file-helper'

export class EmoFormData {
  private body: any[]
  // Now I'm using a fixed string, it works well. So let it go.
  private readonly randomBoundary = RANDOM_BOUNDARY
  private readonly boundary: string
  private readonly endBoundary: string
  constructor () {
    this.body = []
    this.boundary = '--' + this.randomBoundary
    this.endBoundary = this.boundary + '--'
  }

  async add (name: string, value: string | File): Promise<void> {
    let data = this.boundary + '\r\n'
    if (typeof value === 'string') { // add parameters
      data += 'Content-Disposition: form-data; name="' + name + '"\r\n\r\n'
      data += value + '\r\n'
      for (let i = 0; i < data.length; i++) {
        this.body.push(data.charCodeAt(i))
      }
    } else if (value instanceof File) { // add files
      data += 'Content-Disposition: form-data; name="' + name + '"; filename="' + value.name + '"\r\n'
      data += 'Content-Type: ' + value.type + '\r\n\r\n'
      for (let i = 0; i < data.length; i++) {
        this.body.push(data.charCodeAt(i))
      }
      await getArrayBuffer(value).then((fileBuffer) => {
        const fileArray = new Uint8Array(fileBuffer)
        this.body = this.body.concat(Array.prototype.slice.call(fileArray))
      })
      const endTag = '\r\n'
      for (let i = 0; i < endTag.length; i++) {
        this.body.push(endTag.charCodeAt(i))
      }
    }
  }

  getContentType (): string { // this is required when using real random character Boundary.
    return 'multipart/form-data; boundary=' + this.randomBoundary
  }

  getBody (): ArrayBuffer {
    const endBoundaryArray = []
    for (let i = 0; i < this.endBoundary.length; i++) { // write terminator
      endBoundaryArray.push(this.endBoundary.charCodeAt(i))
    }
    this.body = this.body.concat(endBoundaryArray)
    return new Uint8Array(this.body).buffer
  }
}
