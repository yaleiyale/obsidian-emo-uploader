import { ButtonComponent, Notice, request, RequestUrlParam, Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY, IMGUR_DEFAULT_ID, NO_SIGN_IN } from '../base/constants'

export class ImgurFragment extends EmoFragment {
  loginPart!: Setting
  loginBtn!: ButtonComponent
  authenticated = false
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Imgur, el, plugin)
    if (!plugin.initDone) {
      plugin.registerObsidianProtocolHandler('emo-imgur-oauth', async (params) => {
        if (params.error !== undefined) {
          console.log(new Notice(`Authentication failed with error: ${params.error}`))
          return
        }
        const mappedData = params.hash.split('&').map((p) => {
          const sp = p.split('=')
          return [sp[0], sp[1]] as [string, string]
        })
        const map = new Map<string, string>(mappedData)
        localStorage.setItem(
          IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY,
          map.get('access_token') as string
        )
        this.authenticated = await this.updateAccountState()
      })
      plugin.initDone = true
    }
  }

  async display (el: HTMLElement, plugin: Emo): Promise<void> {
    const parms = plugin.config.imgur_parms
    // anonymous or authenticated
    new Setting(el)
      .setName('Anonymous Upload')
      .setDesc('Files uploaded anonymously will not show in your Imgur account.')
      .addToggle((toggle) => {
        toggle.setValue(parms.anonymous)
        toggle.onChange(async (value) => {
          parms.anonymous = value
          await plugin.saveSettings()
        })
      })
    el.createEl('h3', { text: 'Tips' })
    el.createDiv().setText(`Imgur upload will produce the link in this format: ![deletehash](url).
    [deletehash] is used to delete the image you just uploaded.
    If your note will be used for publicity, please remember to delete it in time.`)

    el.createEl('h3', { text: 'Imgur Settings' })

    new Setting(el)
      .setName('id')
      .setDesc('The built-in ID has a daily usage limit, if it is temporarily invalid, you can use your own client ID to upload and delete.')
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
      .setDesc('If you want to delete the image on Imgur, delete it here with the deletehash.')
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

    let imgurStateText = 'authenticate'
    let imgurBtnText = 'sign in'
    try {
      const currentUserName = await this.getAccountName()
      if (currentUserName !== NO_SIGN_IN) {
        imgurStateText = `Authenticated as: ${currentUserName} ✅`
        imgurBtnText = 'Sign Out'
        this.authenticated = true
      }
    } catch (err) {
      console.log(err)
    }
    this.loginPart = new Setting(el)
    this.loginPart.setName(imgurStateText)
      .setDesc('Sometimes the auth results need to be refreshed manually before they are displayed.')
      .addButton((bt) => {
        this.loginBtn = bt
        bt.setCta()
          .setButtonText(imgurBtnText).onClick(async () => {
            if (this.authenticated) {
              localStorage.removeItem(IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY)
              this.authenticated = await this.updateAccountState()
            } else {
              let id = ''
              if (parms.clientid !== '') { id += parms.clientid } else id += IMGUR_DEFAULT_ID
              window.open(`https://api.imgur.com/oauth2/authorize?client_id=${id}&response_type=token`)
            }
          })
      })
  }

  async getAccountName (): Promise<string> {
    const accessToken = localStorage.getItem(IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY)
    if (accessToken === null) { return NO_SIGN_IN }
    const r = await fetch('https://api.imgur.com/3/account/me', {
      headers: new Headers({ Authorization: `Bearer ${accessToken}` })
    })
    if (!r.ok) {
      throw new Error('Imgur account error')
    }
    return ((await r.json()) as AccountInfo).data.url
  }

  async updateAccountState (): Promise<boolean> {
    let imgurStateText = 'authenticate'
    let imgurBtnText = 'sign in'
    let authenticated = false
    try {
      const currentUserName = (await this.getAccountName())
      if (currentUserName !== NO_SIGN_IN) {
        imgurStateText = `Authenticated as: ${currentUserName} ✅`
        imgurBtnText = 'Sign Out'
        authenticated = true
      }
    } catch (err) {
      console.log(err)
    }
    this.loginPart.setName(imgurStateText)
    this.loginBtn.setButtonText(imgurBtnText)
    return authenticated
  }
}

interface AccountInfo {
  success: boolean
  status: number
  data: {
    id: number
    created: number

    url: string
    bio: string
    avatar: string
    avatar_name: string
    cover: string
    cover_name: string
    reputation: number
    reputation_name: string

    pro_expiration: boolean

    user_flow: {
      status: boolean
    }

    is_blocked: boolean
  }
}
