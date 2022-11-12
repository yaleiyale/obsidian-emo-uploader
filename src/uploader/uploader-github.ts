import { request, RequestUrlParam } from 'obsidian'
import { GithubParms } from '../parms/parms-github'
import { getBase64, getFileName } from '../utils/file-helper'
import { EmoUploader } from './emo-uploader'

export class GithubUploader extends EmoUploader {
  path: string
  random: boolean
  required: GithubParms['required']
  constructor (parms: GithubParms) {
    super()
    this.required = parms.required
    this.path = parms.path
    this.random = parms.random
  }

  async upload (file: File): Promise<string> {
    let filePath = ''
    if (this.random) { // use random filename
      const startSuffix = file.name.lastIndexOf('.')
      filePath = this.path + getFileName()
      filePath += startSuffix > 0 ? file.name.substring(startSuffix) : '' // for no suffix files
    } else {
      filePath = this.path + file.name // original filename
    }
    const jsonBody = {
      owner: this.required.owner,
      repo: this.required.repo,
      branch: this.required.branch,
      path: filePath,
      message: this.required.message,
      content: await getBase64(file)
    }
    const form = JSON.stringify(jsonBody)
    const req: RequestUrlParam = {
      url: `https://api.github.com/repos/${this.required.owner}/${this.required.repo}/contents/${filePath}`,
      method: 'PUT',
      headers: {
        Authorization: `token ${this.required.token}`
      },
      body: form
    }

    return await new Promise((resolve, reject) => {
      request(req).then(() => {
        const markdownText = `![](https://fastly.jsdelivr.net/gh/${this.required.owner}/${this.required.repo}@${this.required.branch}/${filePath})`
        resolve(markdownText)
      }).catch(err => {
        reject('Github')
        console.log(err)
      })
    })
  }
}
