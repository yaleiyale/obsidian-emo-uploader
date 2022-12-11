import { request, RequestUrlParam } from 'obsidian'
import { SmmsParms } from '../parms/parms-smms'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'

export class SmmsUploader extends EmoUploader {
  parms!: SmmsParms
  constructor (smmsParms: SmmsParms) {
    super()
    this.parms = smmsParms
  }

  async upload (file: File): Promise<string> {
    const formData = new ReqFormData()
    formData.addParm('format', 'json')
    await formData.addFile('smfile', file)
    const form = formData.pack()
    const req: RequestUrlParam = {
      url: 'https://sm.ms/api/v2/upload',
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_FORMDATA,
        Authorization: this.parms.required.token
      },
      body: form
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
