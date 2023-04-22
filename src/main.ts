import {
  Plugin,
  Editor,
  Notice
} from 'obsidian'
import { t } from './lang/helpers'
import { EmoUploaderSettingTab } from './settings-tab'
import { Config, DEFAULT_SETTINGS, HostingProvider } from './config'
import { EmoUploader } from './base/emo-uploader'
import { GithubUploader } from './uploader/uploader-github'
import { ImgurlUploader } from './uploader/uploader-imgurl'
import { CloudinaryUploader } from './uploader/uploader-cloudinary'
import { SmmsUploader } from './uploader/uploader-smms'
import { ImgbbUploader } from './uploader/uploader-imgbb'
import { ImgurUploader } from './uploader/uploader-imgur'
import { CatboxUploader } from './uploader/uploader-catbox'
import { CheveretoUploader } from './uploader/uploader-chevereto'

export default class Emo extends Plugin {
  config!: Config

  // Plugin load steps
  async onload (): Promise<void> {
    console.log('loading  Emo uploader')
    await this.loadSettings()
    this.setupPasteHandler()
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

  setupPasteHandler (): void {
    // get files from drag or drop
    this.registerEvent(this.app.workspace.on('editor-drop', async (evt: DragEvent, editor: Editor) => {
      const { files } = evt.dataTransfer as DataTransfer
      this.startUpload(files, evt, editor)
    }))
    // get files from clipboard
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
        case HostingProvider.Catbox:
          uploader = new CatboxUploader(this.config.catbox_parms)
          break
        case HostingProvider.Chevereto:
          uploader = new CheveretoUploader(this.config.chevereto_parms)
          break
        default:
          console.log(new Notice(t('broken'), 2000))
          return
      }
      if (uploader.isValid()) { // check the necessary parameters
        evt.preventDefault()
        for (const file of files) {
          const randomString = (Math.random() * 10086).toString(36).slice(-6)
          const pastePlaceText = `![uploading...](${randomString})\n`
          editor.replaceSelection(pastePlaceText) // mark the uploading
          uploader.upload(file).then((markdownText) => {
            const showTag = file.type.startsWith('image') ? 0 : 1// whether use `!` at the beginning
            this.replaceText(editor, pastePlaceText, markdownText.slice(showTag)) // use image/file link
          }).catch(err => {
            this.replaceText(editor, pastePlaceText, `[${this.config.choice} upload error]()`)
            console.log(new Notice(this.config.choice + t('upload error'), 2000))
            console.log(err)
          })
        }
      } else {
        console.log(new Notice(t('parms error'), 2000))
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
}
