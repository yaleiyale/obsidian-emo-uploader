import {
  App,
  PluginSettingTab,
  Setting
} from 'obsidian'
import { HostingProvider, supportList } from './config'
import Emo from './main'
import { EmoFragment } from './fragment/emo-fragment'
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

    containerEl.createEl('h2', { text: 'Target' })
    const pick = new Setting(containerEl)
      .setName('target hosting')
      .setDesc('Choose your target. Before uploading, make sure you have completely filled in the necessary parameters of the selected platform.')

    const githubFragment = new GithubFragment('github', HostingProvider.Github, containerEl, this.plugin)
    this.fragmentList.push(githubFragment)
    const cloudinaryFragment = new CloudinaryFragment('cloudinary', HostingProvider.Cloudinary, containerEl, this.plugin)
    this.fragmentList.push(cloudinaryFragment)
    const smmsFragment = new SmmsFragment('smms', HostingProvider.Smms, containerEl, this.plugin)
    this.fragmentList.push(smmsFragment)
    const imgurlFragment = new ImgurlFragment('imgurl', HostingProvider.ImgURL, containerEl, this.plugin)
    this.fragmentList.push(imgurlFragment)
    const imgbbFragment = new ImgbbFragment('imgbb', HostingProvider.Imgbb, containerEl, this.plugin)
    this.fragmentList.push(imgbbFragment)
    const imgurFragment = new ImgurFragment('imgur', HostingProvider.Imgur, containerEl, this.plugin)
    this.fragmentList.push(imgurFragment)

    this.fragmentList.forEach(element => {
      element.update(this.plugin.config.choice) // which one will show at the first time
    })

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
