import { Notice, request, RequestUrlParam, Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { IMGUR_DEFAULT_ID } from '../base/constants'

export class ImgurFragment extends EmoFragment {
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Imgur, el, plugin)
  }

  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.imgur_parms
    // anonymous or authenticated
    new Setting(el)
      .setName('Anonymous Upload')
      .setDesc('Files uploaded anonymously willnot show in your imgur account.')
      .addToggle((toggle) => {
        toggle.setValue(parms.anonymous)
        toggle.onChange(async (value) => {
          parms.anonymous = value
          await plugin.saveSettings()
        })
      })
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
        bt.setCta()
          .setButtonText('Delete').onClick(() => {
            let auth = 'Client-ID '
            if (parms.clientid !== '') { auth += parms.clientid } else auth += IMGUR_DEFAULT_ID
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
    new Setting(el)
      .setName('authenticate')
      .setDesc('sign in')
      .addButton((bt) =>
        bt.setCta()
          .setButtonText('Authenticate').onClick(() => {
            let id = ''
            if (parms.clientid !== '') { id += parms.clientid } else id += IMGUR_DEFAULT_ID
            window.open(`https://api.imgur.com/oauth2/authorize?client_id=${id}&response_type=token`)
          }))
  }
}
