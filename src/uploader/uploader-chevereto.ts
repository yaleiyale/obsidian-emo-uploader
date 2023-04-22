import { request, RequestUrlParam } from 'obsidian'
import { EmoUploader } from '../base/emo-uploader'
import { CheveretoParms } from '../parms/parms-chevereto'
import { getBase64 } from '../utils/file-helper'

export class CheveretoUploader extends EmoUploader {
  parms!: CheveretoParms
  constructor (cheveretoParms: CheveretoParms) {
    super()
    this.parms = cheveretoParms
  }

  async upload (file: File): Promise<string> {
    const jsonBody = {
      key: this.parms.required.token,
      source: await getBase64(file)
    }
    const form = JSON.stringify(jsonBody)
    const req: RequestUrlParam = {
      url: this.parms.required.domain,
      method: 'POST',
      headers: {
        'X-API-Key': this.parms.required.token
      },
      body: form
    }
    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const json = JSON.parse(res)
        let url = ''
        url = json.image.url
        const markdownText = `![Chevereto](${url})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
