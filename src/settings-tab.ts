import {
  App,
  PluginSettingTab,
  Setting
} from 'obsidian'
import { HostingProvider } from './config'
import Emo from './main'
import { t } from './lang/helpers'
import { EmoFragment } from './base/emo-fragment'
import { CloudinaryFragment } from './fragment/fragment-cloudinary'
import { GithubFragment } from './fragment/fragment-github'
import { ImgbbFragment } from './fragment/fragment-imgbb'
import { ImgurlFragment } from './fragment/fragment-imgurl'
import { SmmsFragment } from './fragment/fragment-smms'
import { ImgurFragment } from './fragment/fragment-imgur'
import { CatboxFragment } from './fragment/fragment-catbox'

export class EmoUploaderSettingTab extends PluginSettingTab {
  private readonly plugin: Emo
  private readonly fragmentList: EmoFragment[] = []
  constructor (app: App, plugin: Emo) {
    super(app, plugin)
    this.plugin = plugin
  }

  display (): void {
    const { containerEl } = this
    containerEl.empty()

    // donate button
    const colaDiv = containerEl.createDiv('cola')
    colaDiv.addClass('emo-cola-div')
    const colaLink = colaDiv.createEl('a', {
      href: 'https://lestua.eu.org/donate'
    })
    const colaImg = colaLink.createEl('img')
    colaImg.outerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="16" x2="38" y2="16" stroke="currentcolor" stroke-width="4" stroke-linecap="round"/><path d="M14.153 18.1425C14.0703 16.9848 14.9873 16 16.148 16H31.852C33.0127 16 33.9297 16.9848 33.847 18.1425L32.1327 42.1425C32.0579 43.1891 31.187 44 30.1378 44H17.8622C16.813 44 15.9421 43.1891 15.8673 42.1425L14.153 18.1425Z" stroke="currentcolor" stroke-width="4"/><path d="M24 10V6C24 4.89543 24.8954 4 26 4H29" stroke="currentcolor" stroke-width="4" stroke-linecap="round"/><path d="M14.7215 11.6712C14.8822 10.7068 15.7166 10 16.6943 10H31.3057C32.2834 10 33.1178 10.7068 33.2785 11.6712L34 16H14L14.7215 11.6712Z" fill="none" stroke="currentcolor" stroke-width="4"/></svg>'

    // provide choices
    containerEl.createEl('h2', { text: 'Emo' })
    const pick = new Setting(containerEl)
      .setName(t('target hosting'))
      .setDesc(t('target hosting desc'))

    this.fragmentList.push(new GithubFragment(containerEl, this.plugin))
    this.fragmentList.push(new ImgurFragment(containerEl, this.plugin))
    this.fragmentList.push(new CloudinaryFragment(containerEl, this.plugin))
    this.fragmentList.push(new SmmsFragment(containerEl, this.plugin))
    this.fragmentList.push(new ImgurlFragment(containerEl, this.plugin))
    this.fragmentList.push(new ImgbbFragment(containerEl, this.plugin))
    this.fragmentList.push(new CatboxFragment(containerEl, this.plugin))

    // which one will show at the first time
    this.fragmentList.forEach(element => {
      element.update(this.plugin.config.choice)
    })

    const supportList: string[] = []
    for (const key in HostingProvider) {
      supportList.push(HostingProvider[key as keyof typeof HostingProvider])
    }

    pick.addDropdown((dropdown) => {
      supportList.forEach((record) => { dropdown.addOption(record, record) })
      dropdown.setValue(this.plugin.config.choice)
        .onChange(async (value) => {
          this.plugin.config.choice = value as HostingProvider
          await this.plugin.saveSettings()
          this.fragmentList.forEach(element => {
            element.update(this.plugin.config.choice) // update the tab when make a choice
          })
        })
    })
  }
}
