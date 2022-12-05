import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'

export class ImgurlFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.ImgURL, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.imgurl_parms
    el.createEl('h3', { text: 'ImgURL Settings' })

    new Setting(el)
      .setName('uid')
      .setDesc('ImgURL uid')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.uid)
          .onChange(async (value) => {
            parms.required.uid = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('token')
      .setDesc('ImgURL token')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.token)
          .onChange(async (value) => {
            parms.required.token = value
            await plugin.saveSettings()
          })
      })
  }
}
