// 第一部分
import type { RequestUrlParam } from 'obsidian'
import { request } from 'obsidian'
import { EmoFormData } from '../utils/emo-formdata'
import { EmoUploader } from '../base/emo-uploader'
import { CONTENT_TYPE_FORMDATA } from '../base/constants'
import type { AlistParms } from '../parms/parms-alist'
import { sha256 } from 'js-sha256'

export class AlistUploader extends EmoUploader {
  parms!: AlistParms
  constructor (alistParms: AlistParms) {
    super()
    this.parms = alistParms
  }

  async upload (file: File): Promise<string> {
    // 获取token
    const token = await this.getToken()
    // 新建文件夹
    const determine = await this.determine(file)
    if (determine !== 'success') {
      await this.mkdirFile(file)
    }
    // 上传文件
    await this.putFile(file)
    // 刷新列表
    await this.refreshDir(file)
    // 重命名文件
    let newName = file.name
    if (file.name === 'image.png') {
      newName = await this.renameFile(file)
    }

    const extension = await this.getFileExtension(file)
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/fs/get`,
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/${this.parms.required.uploadPath}/${extension}/${newName}`
      })
    }
    // 发送请求并返回结果
    return await new Promise((resolve, reject) => {
      request(req).then(async res => {
        const json = JSON.parse(res)
        // 赋给markdownText
        const markdownText = `![${newName}](${json.data.raw_url as string})`
        resolve(markdownText)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 第二部分
  // 获取token
  async getToken (): Promise<string> {
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/auth/login/hash`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.parms.required.username,
        password: sha256(this.parms.required.password + '-https://github.com/alist-org/alist')
      })
    }
    // 发送请求并返回token
    return await new Promise((resolve, reject) => {
      request(req).then(res => {
        const json = JSON.parse(res)
        resolve(json.data.token as string)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 文件类型
  async getFileExtension (file: File): Promise<string> {
    const filename = file.name
    const match = filename.match(/\.([^.]+)$/)
    return (match != null) ? match[1] : ''
  }

  // 判断文件夹是否存在
  async determine (file: File): Promise<string> {
    const extension = await this.getFileExtension(file)
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/fs/get`,
      method: 'POST',
      headers: {
        Authorization: await this.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/${this.parms.required.uploadPath}/${extension}`
      })
    }
    return await new Promise((resolve, reject) => {
      request(req).then(res => {
        const json = JSON.parse(res)
        resolve(json.message as string)
      }).catch(err => {
        reject(err)
      })
    })
  }

  async mkdirFile (file: File): Promise<void> {
    const extension = await this.getFileExtension(file)
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/fs/mkdir`,
      method: 'POST',
      headers: {
        Authorization: await this.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/${this.parms.required.uploadPath}/${extension}`
      })
    }
    await request(req) // 发送请求并返回链接
  }

  // 上传文件
  async putFile (file: File): Promise<void> {
    const extension = await this.getFileExtension(file)
    const formData = new EmoFormData()
    await formData.add('file', file)
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/fs/form`,
      method: 'PUT',
      headers: {
        Authorization: await this.getToken(),
        'Content-Type': CONTENT_TYPE_FORMDATA,
        'File-Path': encodeURIComponent(`/${this.parms.required.uploadPath}/${extension}/${file.name}`),
        'As-Task': 'true'
      },
      body: formData.getBody()
    }
    await request(req) // 发送请求并返回链接
  }

  // 第三部分
  // 刷新目录
  async refreshDir (file: File): Promise<void> {
    const extension = await this.getFileExtension(file)
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/fs/list`,
      method: 'POST',
      headers: {
        Authorization: await this.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: `/${this.parms.required.uploadPath}/${extension}`,
        page: 1,
        password: '',
        per_page: 0,
        refresh: true
      })
    }
    await request(req)
  }

  // 重命名文件
  async renameFile (file: File): Promise<string> {
    const extension = await this.getFileExtension(file)
    // 获取当前时间
    const now = new Date()
    // 格式化时间
    const formatTime = (n: number): string => n.toString().padStart(2, '0')
    // 生成新文件名
    const newName = `${now.getFullYear()}${formatTime((now.getMonth() + 1))}${formatTime(now.getDate())}-${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}.${extension}`
    // 构造请求参数
    const req: RequestUrlParam = {
      url: `${this.parms.required.domain}/api/fs/rename`,
      method: 'POST',
      headers: {
        Authorization: await this.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        path: `/${this.parms.required.uploadPath}/${extension}/${file.name}`
      })
    }
    // 发送请求
    await request(req)
    return newName
  }
}
