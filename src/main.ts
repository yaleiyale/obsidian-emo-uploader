import {
  Notice,
  Plugin,
  MarkdownView,
  Editor,
} from "obsidian";

import axios from "axios"
import objectPath from 'object-path'
import ImageUploaderSettingTab from './settings-tab'

interface ImageUploaderSettings {
  apiEndpoint: string;
  uploadHeader: string;
  uploadBody: string;
  imageUrlPath: string;
}

const DEFAULT_SETTINGS: ImageUploaderSettings = {
  apiEndpoint: null,
  uploadHeader: null,
  uploadBody: "{\"image\": \"$FILE\"}",
  imageUrlPath: null
};

type Handlers = {
  drop: (cm: CodeMirror.Editor, event: DragEvent) => void;
  paste: (cm: CodeMirror.Editor, event: ClipboardEvent) => void;
};

export default class ImageUploader extends Plugin {
  settings: ImageUploaderSettings;

  private cmAndHandlersMap = new Map<CodeMirror.Editor, Handlers>();

  private getEditor() {
    const mdView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (mdView) {
      return mdView.editor;
    } else {
      return null;
    }
  }

  private backupOriginalHandlers(cm: CodeMirror.Editor) {
    if (!this.cmAndHandlersMap.has(cm)) {
      this.cmAndHandlersMap.set(cm, {
        drop: (cm as any)._handlers.drop[0],
        paste: (cm as any)._handlers.paste[0],
      });
    }
    return this.cmAndHandlersMap.get(cm);
  }

  setupPasteHandler(): void {
    this.registerCodeMirror((cm: any) => {
      const originalPasterHandler = this.backupOriginalHandlers(cm);
      cm._handlers.paste[0] = (_: any, e: ClipboardEvent) => {
        const { files } = e.clipboardData;
        if (files.length == 0 || !files[0].type.startsWith("image")) {
          originalPasterHandler.paste(_, e)
        }
        else if (this.settings.apiEndpoint && this.settings.uploadHeader && this.settings.imageUrlPath) {
          for (const file of files) {

            const randomString = (Math.random() * 10086).toString(36).substr(0, 8)
            const pastePlaceText = `![uploading...](${randomString})\n`
            this.getEditor().replaceSelection(pastePlaceText)

            const formData = new FormData()
            const uploadBody = JSON.parse(this.settings.uploadBody)
            for (const key in uploadBody) {
              if (uploadBody[key] == "$FILE") {
                formData.append(key, file)
              }
              else {
                formData.append(key, uploadBody[key])
              }
            }

            axios.post(this.settings.apiEndpoint, formData, {
              "headers": JSON.parse(this.settings.uploadHeader)
            }).then(res => {
              const url = objectPath.get(res.data, this.settings.imageUrlPath)
              const imgMarkdownText = `![](${url})`
              this.replaceText(this.getEditor(), pastePlaceText, imgMarkdownText)
            }, err => {
              new Notice(err, 5000)
              console.log(err)
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              const newEvt = new ClipboardEvent("paste", {
                clipboardData: dataTransfer
              })
              originalPasterHandler.paste(_, newEvt)
            })
          }
        }
        else {
          new Notice("Image Uploader: Please check the image hosting settings.");
          originalPasterHandler.paste(_, e);
        }
      }
    })
  }

  private replaceText(editor: Editor, target: string, replacement: string): void {
    target = target.trim()
    const lines = editor.getValue().split("\n");
    for (let i = 0; i < lines.length; i++) {
      const ch = lines[i].indexOf(target)
      if (ch !== -1) {
        const from = { line: i, ch };
        const to = { line: i, ch: ch + target.length };
        editor.replaceRange(replacement, from, to);
        break;
      }
    }
  }

  async onload(): Promise<void> {
    console.log("loading Image Uploader");
    await this.loadSettings();
    this.setupPasteHandler()
    this.addSettingTab(new ImageUploaderSettingTab(this.app, this));
  }

  onunload(): void {
    console.log("unloading plugin");
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
