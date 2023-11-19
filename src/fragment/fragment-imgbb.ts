import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { t } from '../lang/helpers'

export class ImgbbFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Imgbb, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.imgbb_parms
    el.createEl('h3', { text: t('imgbb Settings') })

    new Setting(el)
      .setName('key')
      .addText((text) => {
        text
          .setValue(parms.required.key)
          .onChange(async (value) => {
            parms.required.key = value
            await plugin.saveSettings()
          })
      })
  }
}
