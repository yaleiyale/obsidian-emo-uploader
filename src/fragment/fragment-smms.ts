import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'

export class SmmsFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Smms, el, plugin)
  }

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
