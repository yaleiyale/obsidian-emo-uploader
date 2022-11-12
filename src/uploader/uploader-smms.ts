import { request, RequestUrlParam } from 'obsidian'
import { SmmsParms } from '../parms/parms-smms'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from './emo-uploader'

export class SmmsUploader extends EmoUploader {
  required: SmmsParms['required']
  constructor (parms: SmmsParms) {
    super()
    this.required = parms.required
  }

  async upload (file: File): Promise<string> {
    const randomBoundary = Date.now().toString(16)
    const formData = new ReqFormData(randomBoundary)
    formData.addParm('format', 'json')
    await formData.addFile('smfile', file)
    const form = formData.pack()
    const req: RequestUrlParam = {
      url: 'https://sm.ms/api/v2/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + randomBoundary,
        Authorization: this.required.token
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
        const markdownText = `![](${url})`
        resolve(markdownText)
      }).catch(err => {
        reject('SM.MS')
        console.log(err)
      })
    })
  }
}
