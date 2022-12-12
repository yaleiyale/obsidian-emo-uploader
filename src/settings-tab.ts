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
        bt.buttonEl.outerHTML = '<a id="buymeacola" href="https://lestua.eu.org/donate/"><?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10C10.5 13 11 14.5 11.5 18C11.9 20.8 12 25.1667 12 27C9.83333 28 5 30 5 34C5 38 10 43 24 43C38 43 43 38 43 34C43 30 36 27 36 27C36 27 36 21.5 36.5 18C37 14.5 37.5 13 38 10" stroke="currentcolor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 27C36 31 35 35 23.5 35" stroke="currentcolor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="24" cy="10" rx="14" ry="5" stroke="currentcolor" stroke-width="4"/></svg></a>'
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
