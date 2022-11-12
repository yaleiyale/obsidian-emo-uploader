import { request, RequestUrlParam } from 'obsidian'
import { ImgbbParms } from '../parms/parms-imgbb'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from './emo-uploader'

export class ImgbbUploader extends EmoUploader {
  required: ImgbbParms['required']
  constructor (parms: ImgbbParms) {
    super()
    this.required = parms.required
  }

  async upload (file: File): Promise<string> {
    const randomBoundary = Date.now().toString(16)
    const formData = new ReqFormData(randomBoundary)
    formData.addParm('key', this.required.key)
    await formData.addFile('image', file)
    const form = formData.pack()
    const req: RequestUrlParam = {
      url: 'https://api.imgbb.com/1/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + randomBoundary
      },
      body: form
    }

    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const json = JSON.parse(res)
        const url = json.data.url
        const markdownText = `![](${url as string})`
        resolve(markdownText)
      }).catch(err => {
        reject('imgbb')
        console.log(err)
      })
    })
  }
}
