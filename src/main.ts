// Imports for plugin
import {
  Notice,
  Plugin,
  Editor,
} from "obsidian";

// For API requests
import axios from "axios"
import objectPath from 'object-path'

// Settings tab import
import CloudinaryUploaderSettingTab from './settings-tab'

//Define Cloudinary Settings
interface CloudinarySettings {
  cloudName: string;
  uploadPreset: string;
  folder: string;
  f_auto: boolean;
  //maxWidth: number; TODO
  // enableResize: boolean; TODO
}

// Set settings defaults
const DEFAULT_SETTINGS: CloudinarySettings = {
  cloudName: null,
  uploadPreset: null,
  folder: null,
  f_auto: false,
  //maxWidth: 4096, TODO
  //enableResize: false, TODO later
};
export default class CloudinaryUploader extends Plugin {
  settings: CloudinarySettings;


  setupPasteHandler(): void {
  // On paste event, get "files" from clipbaord data
  // If files contain image, move to API call
  // if Files empty or does not contain image, throw error
    this.registerEvent(this.app.workspace.on('editor-paste',async (evt: ClipboardEvent, editor: Editor)=>{
      const { files } = evt.clipboardData;
      if(files.length > 0){
       if (this.settings.cloudName && this.settings.uploadPreset && files[0].type.startsWith("image")) {
        evt.preventDefault(); // Prevent default paste behaviour
        for (let file of files) {
          const randomString = (Math.random() * 10086).toString(36).substr(0, 8)
          const pastePlaceText = `![uploading...](${randomString})\n`
          editor.replaceSelection(pastePlaceText) // Generate random string to show on editor screen while API call completes

          // Cloudinary request format
          // Send form data with a file and upload preset
          // Optionally define a folder
          const formData = new FormData();
          formData.append('file',file);
          formData.append('upload_preset',this.settings.uploadPreset);
          formData.append('folder',this.settings.folder);

          // Make API call
          axios({
            url: `https://api.cloudinary.com/v1_1/${this.settings.cloudName}/auto/upload`,
            method: 'POST',
            data: formData
          }).then(res => {
          // Get response public URL of uploaded image
          console.log(res);
            const url = objectPath.get(res.data, 'secure_url')
            let imgMarkdownText ="";
            if(this.settings.f_auto){
              const splitURL = url.split("/upload/",2);
              let modifiedURL='';
              modifiedURL = splitURL[0]+="f_auto/"+splitURL[1];
              imgMarkdownText = `![](${modifiedURL})`;
            }else{
            imgMarkdownText = `![](${url})`;
            }
            // Show MD syntax using uploaded image URL, in Obsidian Editor
            this.replaceText(editor, pastePlaceText, imgMarkdownText)
          }, err => {
          // Fail otherwise
            new Notice(err, 5000)
            console.log(err)
          })
        }
      }
      // else {
      // // If not image data, or empty files array
      //   new Notice("Cloudinary Image Uploader: Please check the image hosting settings.");
      //   editor.replaceSelection("Please check settings for upload\n This will also appear if file is not of image type");
      // } 

    }}))
  }
  // Function to replace text
  private replaceText(editor: Editor, target: string, replacement: string): void {
    target = target.trim();
    let lines = [];
    for (let i = 0; i < editor.lineCount(); i++){
      lines.push(editor.getLine(i));
    }
    //const tlines = editor.getValue().split("\n");
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

  // Plugin load steps
  async onload(): Promise<void> {
    console.log("loading Cloudinary Uploader");
    await this.loadSettings();
    this.setupPasteHandler();
    this.addSettingTab(new CloudinaryUploaderSettingTab(this.app, this));
  }

  // Plugin shutdown steps
  onunload(): void {
    console.log("unloading Cloudinary Uploader");

  }
  // Load settings infromation
  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  // When saving settings
  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
