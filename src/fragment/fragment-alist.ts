import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { t } from '../lang/helpers'

export class AlistFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Alist, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.alist_parms
    el.createEl('h3', { text: 'Alist Settings'})

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
      .setName('username')
      .addText((text) => {
        text
          .setValue(parms.required.username)
          .onChange(async (value) => {
            parms.required.username = value
            await plugin.saveSettings()
          })
      })

    new Setting(el)
      .setName('password')
      .addText((text) => {
        text
          .setValue(parms.required.password)
          .onChange(async (value) => {
            parms.required.password = value
            await plugin.saveSettings()
          })
      })

    new Setting(el)
      .setName('uploadPath')
      .addText((text) => {
        text
          .setValue(parms.required.uploadPath)
          .onChange(async (value) => {
            parms.required.uploadPath = value
            await plugin.saveSettings()
          })
      })

  }
}
