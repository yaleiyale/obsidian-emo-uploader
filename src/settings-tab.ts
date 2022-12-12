import {
  App,
  PluginSettingTab,
  Setting
} from 'obsidian'
import { HostingProvider } from './config'
import Emo from './main'
import { EmoFragment } from './base/emo-fragment'
import { CloudinaryFragment } from './fragment/fragment-cloudinary'
import { GithubFragment } from './fragment/fragment-github'
import { ImgbbFragment } from './fragment/fragment-imgbb'
import { ImgurlFragment } from './fragment/fragment-imgurl'
import { SmmsFragment } from './fragment/fragment-smms'
import { ImgurFragment } from './fragment/fragment-imgur'
import { t } from './lang/helpers'

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

    containerEl.createEl('h2', { text: 'Emo' })
    const pick = new Setting(containerEl)
      .setName(t('target hosting'))
      .setDesc(t('target hosting desc'))
    new Setting(containerEl)
      .setName(t('donate'))
      .setDesc(t('donate desc'))
      .addButton((bt) => {
        bt.buttonEl.outerHTML = '<a id="buymeacola" href="https://lestua.eu.org/donate/"><svg class="icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 011.92 2.56l-2.33 8A2 2 0 0117.5 22H4a2 2 0 01-2-2v-8a2 2 0 012-2h2.76a2 2 0 001.79-1.11L12 2h0a3.13 3.13.0 013 3.88z"></path></svg></a>'
      })

    this.fragmentList.push(new GithubFragment(containerEl, this.plugin))
    this.fragmentList.push(new CloudinaryFragment(containerEl, this.plugin))
    this.fragmentList.push(new SmmsFragment(containerEl, this.plugin))
    this.fragmentList.push(new ImgurlFragment(containerEl, this.plugin))
    this.fragmentList.push(new ImgbbFragment(containerEl, this.plugin))
    this.fragmentList.push(new ImgurFragment(containerEl, this.plugin))

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
