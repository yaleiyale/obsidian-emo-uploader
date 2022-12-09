import {
  Plugin,
  Editor,
  Notice
} from 'obsidian'
import { EmoUploaderSettingTab } from './settings-tab'
import { Config, DEFAULT_SETTINGS, HostingProvider } from './config'
import { EmoUploader } from './base/emo-uploader'
import { GithubUploader } from './uploader/uploader-github'
import { ImgurlUploader } from './uploader/uploader-imgurl'
import { CloudinaryUploader } from './uploader/uploader-cloudinary'
import { SmmsUploader } from './uploader/uploader-smms'
import { ImgbbUploader } from './uploader/uploader-imgbb'
import { ImgurUploader } from './uploader/uploader-imgur'
import { IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY } from './base/constants'

export default class Emo extends Plugin {
  config!: Config
  setupPasteHandler (): void {
    // On paste event, get "files" from clipbaord data
    this.registerEvent(this.app.workspace.on('editor-drop', async (evt: DragEvent, editor: Editor) => {
      const { files } = evt.dataTransfer as DataTransfer
      this.startUpload(files, evt, editor)
    }))
    this.registerEvent(this.app.workspace.on('editor-paste', async (evt: ClipboardEvent, editor: Editor) => {
      const { files } = evt.clipboardData as DataTransfer
      this.startUpload(files, evt, editor)
    }))
  }

  startUpload (files: FileList, evt: Event, editor: Editor): void {
    let uploader: EmoUploader
    if (files.length > 0) {
      switch (this.config.choice) {
        case HostingProvider.Github:
          uploader = new GithubUploader(this.config.github_parms)
          break
        case HostingProvider.ImgURL:
          uploader = new ImgurlUploader(this.config.imgurl_parms)
          break
        case HostingProvider.Cloudinary:
          uploader = new CloudinaryUploader(this.config.cloudinary_parms)
          break
        case HostingProvider.Smms:
          uploader = new SmmsUploader(this.config.smms_parms)
          break
        case HostingProvider.Imgbb:
          uploader = new ImgbbUploader(this.config.imgbb_parms)
          break
        case HostingProvider.Imgur:
          uploader = new ImgurUploader(this.config.imgur_parms)
          break
        default:
          console.log(new Notice('Emo broken. Check your target', 2000))
          return
      }
      if (uploader.isValid()) {
        evt.preventDefault()
        for (const file of files) {
          const randomString = (Math.random() * 10086).toString(36).slice(-6)
          const pastePlaceText = `![uploading...](${randomString})\n`
          editor.replaceSelection(pastePlaceText)
          uploader.upload(file).then((markdownText) => {
            const showTag = file.type.startsWith('image') ? 0 : 1// whether use `!` at the beginning
            this.replaceText(editor, pastePlaceText, markdownText.slice(showTag))
          }).catch(err => {
            this.replaceText(editor, pastePlaceText, `[${this.config.choice} upload error]()`)
            console.log(new Notice(this.config.choice + ' upload error', 2000))
            console.log(err)
          })
        }
      } else {
        console.log(new Notice('Emo need more prams', 2000))
        console.log(uploader)
      }
    }
  }

  // Function to replace text
  private replaceText (editor: Editor, target: string, replacement: string): void {
    target = target.trim()
    const lines = []
    for (let i = 0; i < editor.lineCount(); i++) {
      lines.push(editor.getLine(i))
    }
    for (let i = 0; i < lines.length; i++) {
      const ch = lines[i].indexOf(target)
      if (ch !== -1) {
        const from = { line: i, ch }
        const to = { line: i, ch: ch + target.length }
        editor.replaceRange(replacement, from, to)
        break
      }
    }
  }

  // Plugin load steps
  async onload (): Promise<void> {
    console.log('loading  Emo uploader')
    await this.loadSettings()
    this.setupPasteHandler()
    this.registerObsidianProtocolHandler('emo-imgur-oauth', (params) => {
      if (params.error !== '') {
        console.log(new Notice(`Authentication failed with error: ${params.error}`))
        return
      }
      const mappedData = params.hash.split('&').map((p) => {
        const sp = p.split('=')
        return [sp[0], sp[1]] as [string, string]
      })
      const map = new Map<string, string>(mappedData)
      localStorage.setItem(
        IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY,
        map.get('access_token') as string
      )
    })
    this.addSettingTab(new EmoUploaderSettingTab(this.app, this))
  }

  // Plugin shutdown steps
  onunload (): void {
    console.log('unloading Emo uploader')
  }

  // Load settings infromation
  async loadSettings (): Promise<void> {
    this.config = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  // When saving settings
  async saveSettings (): Promise<void> {
    await this.saveData(this.config)
  }
}
