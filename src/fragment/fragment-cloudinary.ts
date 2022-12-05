import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'

export class CloudinaryFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Cloudinary, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.cloudinary_parms
    el.createEl('h3', { text: 'Cloudinary Settings' })

    new Setting(el)
      .setName('Cloud Name')
      .setDesc('The name of your Cloudinary Cloud Account')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.name)
          .onChange(async (value) => {
            parms.required.name = value
            await plugin.saveSettings()
          })
      })

    new Setting(el)
      .setName('Cloudinary Upload Template')
      .setDesc('Cloudinary Upload Preference string')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.present)
          .onChange(async (value) => {
            parms.required.present = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('Cloudinary Upload Folder')
      .setDesc('Folder name to use in Cloudinary.  Note, this will be ignored if you have a folder set in your Cloudinary Upload Preset')
      .addText((text) => {
        text
          .setPlaceholder('obsidian -> obsidian/pic.png')
          .setValue(parms.folder)
          .onChange(async (value) => {
            parms.folder = value
            await plugin.saveSettings()
          })
      })
  }
}
