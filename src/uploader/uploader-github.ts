import { request, RequestUrlParam } from 'obsidian'
import { GithubParms } from '../parms/parms-github'
import { getBase64, getFileName } from '../utils/file-helper'
import { EmoUploader } from './emo-uploader'

export class GithubUploader extends EmoUploader {
  parms!: GithubParms
  constructor (githubParms: GithubParms) {
    super()
    this.parms = githubParms
  }

  async upload (file: File): Promise<string> {
    let filePath = ''
    if (this.parms.random) { // use random filename
      const startSuffix = file.name.lastIndexOf('.')
      filePath = this.parms.path + getFileName()
      filePath += startSuffix > 0 ? file.name.substring(startSuffix) : '' // for no suffix files
    } else {
      filePath = this.parms.path + file.name // original filename
    }
    const jsonBody = {
      owner: this.parms.required.owner,
      repo: this.parms.required.repo,
      branch: this.parms.required.branch,
      path: filePath,
      message: this.parms.required.message,
      content: await getBase64(file)
    }
    const form = JSON.stringify(jsonBody)
    const req: RequestUrlParam = {
      url: `https://api.github.com/repos/${this.parms.required.owner}/${this.parms.required.repo}/contents/${filePath}`,
      method: 'PUT',
      headers: {
        Authorization: `token ${this.parms.required.token}`
      },
      body: form
    }

    return await new Promise((resolve, reject) => {
      request(req).then(() => {
        const markdownText = `![](https://fastly.jsdelivr.net/gh/${this.parms.required.owner}/${this.parms.required.repo}@${this.parms.required.branch}/${filePath})`
        resolve(markdownText)
      }).catch(err => {
        reject('Github')
        console.log(err)
      })
    })
  }
}
