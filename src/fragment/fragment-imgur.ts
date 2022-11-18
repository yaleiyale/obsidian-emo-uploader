import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from './emo-fragment'

export class ImgurFragment extends EmoFragment {
  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.imgur_parms
    el.createEl('h3', { text: 'Imgur Settings' })

    new Setting(el)
      .setName('id')
      .setDesc('The built-in ID has a daily usage limit, if it is temporarily invalid, you can use your own client ID')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.clientid)
          .onChange(async (value) => {
            parms.clientid = value
            await plugin.saveSettings()
          })
      })
  }
}
