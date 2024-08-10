import { Setting } from 'obsidian'
import type Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { t } from '../lang/helpers'

export class EasyImageFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.EasgyImage, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.easyimage_parms
    el.createEl('h3', { text: t('EasyImage Settings') })

    new Setting(el)
      .setName(t('domain'))
      .addText((text) => {
        text
          .setValue(parms.required.domain)
          .onChange(async (value) => {
            parms.required.domain = value
            await plugin.saveSettings()
          })
      })

    new Setting(el)
      .setName('token')
      .addText((text) => {
        text
          .setValue(parms.required.token)
          .onChange(async (value) => {
            parms.required.token = value
            await plugin.saveSettings()
          })
      })
  }
}
