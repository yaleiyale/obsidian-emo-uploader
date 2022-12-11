import { request, RequestUrlParam } from 'obsidian'
import { ImgurlParms } from '../parms/parms-imgurl'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'

export class ImgurlUploader extends EmoUploader {
  parms!: ImgurlParms
  constructor (imgurlParms: ImgurlParms) {
    super()
    this.parms = imgurlParms
  }

  async upload (file: File): Promise<string> {
    const formData = new ReqFormData()
    formData.addParm('uid', this.parms.required.uid)
    formData.addParm('token', this.parms.required.token)
    await formData.addFile('file', file)
    const form = formData.pack()
    const req: RequestUrlParam = {
      url: 'https://www.imgurl.org/api/v2/upload',
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_FORMDATA
      },
      body: form
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
