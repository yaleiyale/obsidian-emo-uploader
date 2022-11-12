import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from './emo-fragment'

export class SmmsFragment extends EmoFragment {
  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.smms_parms
    el.createEl('h3', { text: 'SM.MS Settings' })

    new Setting(el)
      .setName('token')
      .setDesc('SM.MS token')
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
