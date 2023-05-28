import { request, RequestUrlParam } from 'obsidian'
import { CloudinaryParms } from '../parms/parms-cloudinary'
import { EmoFormData } from '../utils/emo-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'

export class CloudinaryUploader extends EmoUploader {
  parms!: CloudinaryParms
  constructor (cloudinaryParms: CloudinaryParms) {
    super()
    this.parms = cloudinaryParms
  }

  async upload (file: File): Promise<string> {
    const formData = new EmoFormData()
    await formData.add('upload_preset', this.parms.required.present)
    await formData.add('folder', this.parms.folder)
    await formData.add('file', file)
    const req: RequestUrlParam = {
      url: `https://api.cloudinary.com/v1_1/${this.parms.required.name}/auto/upload`,
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_FORMDATA
      },
      body: formData.getBody()
    }
    return await new Promise((resolve, reject) => {
      request(req).then(res => {
        const json = JSON.parse(res)
        const markdownText = `![Cloudinary](${json.secure_url as string})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
