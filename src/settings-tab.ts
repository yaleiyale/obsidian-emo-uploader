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

    containerEl.createEl('h2', { text: 'Emo - Target' })
    const pick = new Setting(containerEl)
      .setName('target hosting')
      .setDesc('Choose your target. Before uploading, make sure you have completely filled in the necessary parameters of the selected platform.')

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
