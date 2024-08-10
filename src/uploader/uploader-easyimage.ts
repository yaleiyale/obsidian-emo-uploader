import type { RequestUrlParam } from 'obsidian'
import { request } from 'obsidian'
import type { EasyImageParms } from '../parms/parms-easyimage'
import { EmoFormData } from '../utils/emo-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'

export class EasyImageUploader extends EmoUploader {
  parms!: EasyImageParms
  constructor (easyimageParms: EasyImageParms) {
    super()
    this.parms = easyimageParms
  }

  async upload (file: File): Promise<string> {
    const domain = this.parms.required.domain
    const formData = new EmoFormData()
    await formData.add('image', file)
    await formData.add('token', this.parms.required.token)
    const req: RequestUrlParam = {
      url: domain,
      method: 'POST',
      headers: {
        // 'X-API-Key': this.parms.required.token,
        'Content-Type': CONTENT_TYPE_FORMDATA
      },
      body: formData.getBody()
    }
    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const json = JSON.parse(res)
        let url = ''
        url = json.url
        const markdownText = `![EasyImage](${url})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
