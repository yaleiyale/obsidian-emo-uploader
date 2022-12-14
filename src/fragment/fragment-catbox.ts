import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { t } from '../lang/helpers'

export class CatboxFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Catbox, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.catbox_parms
    el.createEl('h3', { text: t('Catbox Settings') })

    new Setting(el)
      .setName('userhash')
      .addText((text) => {
        text
          .setValue(parms.required.userhash)
          .onChange(async (value) => {
            parms.required.userhash = value
            await plugin.saveSettings()
          })
      })
  }
}
