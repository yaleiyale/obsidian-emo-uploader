import { ButtonComponent, Notice, request, RequestUrlParam, Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from '../base/emo-fragment'
import { HostingProvider } from '../config'
import { IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY, IMGUR_DEFAULT_ID, NO_SIGN_IN } from '../base/constants'
import { t } from '../lang/helpers'

export class ImgurFragment extends EmoFragment {
  loginState!: Setting
  loginBtn!: ButtonComponent
  imgurStateText = t('authenticate')
  imgurBtnText = t('sign in')
  authenticated = false
  constructor (el: HTMLElement, plugin: Emo) {
    super(HostingProvider.Imgur, el, plugin)
  }

  async display (el: HTMLElement, plugin: Emo): Promise<void> {
    const parms = plugin.config.imgur_parms
    el.createEl('h3', { text: t('tips') })
    el.createDiv().setText(t('tips text'))
    // anonymous or authenticated
    el.createEl('h3', { text: t('Imgur Settings') })

    new Setting(el)
      .setName(t('Anonymous Upload'))
      .setDesc(t('Anonymous Upload desc'))
      .addToggle((toggle) => {
        toggle.setValue(parms.anonymous)
        toggle.onChange(async (value) => {
          parms.anonymous = value
          await plugin.saveSettings()
        })
      })

    new Setting(el)
      .setName(t('imgurid'))
      .setDesc(t('built-in id desc'))
      .addText((text) => {
        text
          .setValue(parms.clientid)
          .onChange(async (value) => {
            parms.clientid = value
            await plugin.saveSettings()
          })
      })

    let hash = ''
    new Setting(el)
      .setName(t('delete'))
      .setDesc(t('delete desc'))
      .addText((text) => {
        text
          .setPlaceholder('deletehash')
          .onChange(async (value) => {
            hash = value
          })
      })
      .addButton((bt) => {
        bt.setCta()
          .setButtonText(t('delete btn')).onClick(() => {
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
              console.log(new Notice(t('delete done'), 2000))
            }).catch(() => {
              console.log(new Notice(t('delete fail'), 2000))
            })
          })
      })

    // auth part
    await this.checkState()
    this.loginState = new Setting(el)
    this.loginState.setName(this.imgurStateText)
      .setDesc(t('auth desc'))
      .addButton((bt) => {
        this.loginBtn = bt
        this.loginBtn.setCta()
          .setButtonText(this.imgurBtnText).onClick(async () => {
            if (this.authenticated) { // log out
              localStorage.removeItem(IMGUR_ACCESS_TOKEN_LOCALSTORAGE_KEY)
              this.authenticated = this.drawLogin()
            } else { // log in
              let id = ''
              if (parms.clientid !== '') { id += parms.clientid } else id += IMGUR_DEFAULT_ID
              window.open(`https://api.imgur.com/oauth2/authorize?client_id=${id}&response_type=token`)
            }
          })
      })
  }

  // influence imgurStateText imgurBtnText authenticated
  async checkState (): Promise<void> {
    try {
      const currentUserName = await this.getAccountName()
      if (currentUserName !== NO_SIGN_IN) {
        this.imgurStateText = t('imgur account') + `${currentUserName} ✅`
        this.imgurBtnText = t('Sign Out')
        this.authenticated = true
      }
    } catch (err) {
      console.log(err)
    }
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

  drawLogin (): boolean {
    this.imgurStateText = t('authenticate')
    this.imgurBtnText = t('sign in')
    this.loginState.setName(this.imgurStateText)
    this.loginBtn.setButtonText(this.imgurBtnText)
    return false
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
