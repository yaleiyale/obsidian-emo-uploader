import type { RequestUrlParam } from 'obsidian'
import { request } from 'obsidian'
import type { ImgurlParms } from '../parms/parms-imgurl'
import { EmoFormData } from '../utils/emo-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'

export class ImgurlUploader extends EmoUploader {
  parms!: ImgurlParms
  constructor (imgurlParms: ImgurlParms) {
    super()
    this.parms = imgurlParms
  }

  async upload (file: File): Promise<string> {
    const formData = new EmoFormData()
    await formData.add('uid', this.parms.required.uid)
    await formData.add('token', this.parms.required.token)
    await formData.add('file', file)
    const req: RequestUrlParam = {
      url: 'https://www.imgurl.org/api/v2/upload',
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_FORMDATA
      },
      body: formData.getBody()
    }

    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const json = JSON.parse(res)
        const markdownText = `![ImgURL](${json.data.url as string})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
