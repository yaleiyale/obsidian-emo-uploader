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
    const formData = new EmoFormData()
    await formData.add('format', 'json')
    await formData.add('smfile', file)
    const req: RequestUrlParam = {
      url: 'https://sm.ms/api/v2/upload',
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_FORMDATA,
        Authorization: this.parms.required.token
      },
      body: formData.getBody()
    }

    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const json = JSON.parse(res)
        let url = ''
        try {
          url = json.data.url
        } catch (error) {
          url = json.images // Image upload repeated limit, this image exists at here
        }
        const markdownText = `![SMMS](${url})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
