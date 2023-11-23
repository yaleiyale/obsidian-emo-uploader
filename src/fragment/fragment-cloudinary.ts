import { Setting } from 'obsidian'
import type Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { t } from '../lang/helpers'

export class CloudinaryFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Cloudinary, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.cloudinary_parms
    el.createEl('h3', { text: t('Cloudinary Settings') })

    new Setting(el)
      .setName('Cloud Name')
      .addText((text) => {
        text
          .setValue(parms.required.name)
          .onChange(async (value) => {
            parms.required.name = value
            await plugin.saveSettings()
          })
      })

    new Setting(el)
      .setName('Upload Presets')
      .addText((text) => {
        text
          .setValue(parms.required.present)
          .onChange(async (value) => {
            parms.required.present = value
            await plugin.saveSettings()
          })
      })

    new Setting(el)
      .setName('Upload Folder')
      .setDesc(t('Upload Folder desc'))
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
