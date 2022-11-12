import { request, RequestUrlParam } from 'obsidian'
import { CloudinaryParms } from '../parms/parms-cloudinary'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from './emo-uploader'

export class CloudinaryUploader extends EmoUploader {
  folder: string
  required: CloudinaryParms['required']
  constructor (parms: CloudinaryParms) {
    super()
    this.required = parms.required
    this.folder = parms.folder
  }

  async upload (file: File): Promise<string> {
    const randomBoundary = Date.now().toString(16)
    const formData = new ReqFormData(randomBoundary)
    formData.addParm('upload_preset', this.required.present)
    formData.addParm('folder', this.folder)
    await formData.addFile('file', file)
    const form = formData.pack()
    const req: RequestUrlParam = {
      url: `https://api.cloudinary.com/v1_1/${this.required.name}/auto/upload`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;boundary=' + randomBoundary
      },
      body: form
    }
    return await new Promise((resolve, reject) => {
      request(req).then(res => {
        const json = JSON.parse(res)
        const markdownText = `![](${json.secure_url as string})`
        resolve(markdownText)
      }).catch(err => {
        reject('Cloudinary')
        console.log(err)
      })
    })
  }
}
