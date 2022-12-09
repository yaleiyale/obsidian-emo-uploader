import { request, RequestUrlParam } from 'obsidian'
import { ImgurParms } from '../parms/parms-imgur'
import { ReqFormData } from '../utils/req-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY, IMGUR_DEFAULT_ID, NO_SIGN_IN } from '../base/constants'

export class ImgurUploader extends EmoUploader {
  parms!: ImgurParms
  constructor (imgurlParms: ImgurParms) {
    super()
    this.parms = imgurlParms
  }

  async upload (file: File): Promise<string> {
    const randomBoundary = Date.now().toString(16)
    const formData = new ReqFormData(randomBoundary)
    await formData.addFile('image', file)
    const form = formData.pack()
    let req: RequestUrlParam
    if (this.parms.anonymous) {
      let auth = 'Client-ID '
      if (this.parms.clientid !== '') { auth += this.parms.clientid } else auth += IMGUR_DEFAULT_ID
      req = {
        url: 'https://api.imgur.com/3/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data;boundary=' + randomBoundary,
          Authorization: auth
        },
        body: form
      }
    } else {
      const accessToken = localStorage.getItem(IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY)
      if (accessToken !== null) {
        req = {
          url: 'https://api.imgur.com/3/image',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;boundary=' + randomBoundary,
            Authorization: `Bearer ${accessToken}`
          },
          body: form
        }
      } else {
        return NO_SIGN_IN
      }
    }
    return await new Promise((resolve, reject) => {
      request(req).then((res) => {
        const json = JSON.parse(res)
        const deleteurl = json.data.deletehash
        const url = json.data.link
        const markdownText = `![${deleteurl as string}](${url as string})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
