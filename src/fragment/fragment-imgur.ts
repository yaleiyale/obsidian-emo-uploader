import { Notice, request, RequestUrlParam, Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'

export class ImgurFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Imgur, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.imgur_parms
    el.createEl('h3', { text: 'Tips for Anonymous Upload' })
    el.createDiv().setText(`Imgur upload will produce the link in this format: ![deletehash](url).
    [deletehash] is used to delete the image you just uploaded.
    If your note will be used for publicity, please remember to delete it in time.`)

    el.createEl('h3', { text: 'Imgur Settings' })

    new Setting(el)
      .setName('id')
      .setDesc('The built-in ID has a daily usage limit, if it is temporarily invalid, you can use your own client ID to upload and delete')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.clientid)
          .onChange(async (value) => {
            parms.clientid = value
            await plugin.saveSettings()
          })
      })
    let hash = ''
    new Setting(el)
      .setName('delete')
      .setDesc('If you want to delete the image on Imgur, delete it here with the deletehash')
      .addText((text) => {
        text
          .setPlaceholder('deletehash')
          .onChange(async (value) => {
            hash = value
          })
      })
      .addButton((bt) => {
        bt.setButtonText('Delete').onClick(() => {
          let auth = 'Client-ID '
          if (parms.clientid !== '') { auth += parms.clientid } else auth += parms.required.emoid
          const req: RequestUrlParam = {
            url: 'https://api.imgur.com/3/image/' + hash,
            method: 'DELETE',
            headers: {
              Authorization: auth
            }
          }
          request(req).then(() => {
            console.log(new Notice('delete done', 2000))
          }).catch(() => {
            console.log(new Notice('delete fail', 2000))
          })
        })
      })
  }
}
