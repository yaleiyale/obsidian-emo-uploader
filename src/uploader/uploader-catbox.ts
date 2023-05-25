import { request, RequestUrlParam } from 'obsidian'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'
import { CatboxParms } from '../parms/parms-catbox'

export class CatboxUploader extends EmoUploader {
  parms!: CatboxParms
  constructor (catboxParms: CatboxParms) {
    super()
    this.parms = catboxParms
  }

  async upload (file: File): Promise<string> {
    const formData = new ReqFormData()
    await formData.add('reqtype', 'fileupload')
    await formData.add('userhash', this.parms.required.userhash)
    await formData.add('fileToUpload', file)
    const form = formData.pack()
    const req: RequestUrlParam = {
      url: 'https://catbox.moe/user/api.php',
      method: 'POST',
      headers: {
        'Content-Type': CONTENT_TYPE_FORMDATA
      },
      body: form
    }

    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const markdownText = `![Catbox](${res})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
