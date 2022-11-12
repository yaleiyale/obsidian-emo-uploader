import { Setting } from 'obsidian'
import Emo from '../main'
import { EmoFragment } from './emo-fragment'

export class GithubFragment extends EmoFragment {
  display (el: HTMLElement, plugin: Emo): void {
    const parms = plugin.config.github_parms
    el.createEl('h3', { text: 'Github Settings' })
    new Setting(el)
      .setName('owner')
      .setDesc('the account owner of the repository')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.owner)
          .onChange(async (value) => {
            parms.required.owner = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('repo')
      .setDesc('the name of the repository')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.repo)
          .onChange(async (value) => {
            parms.required.repo = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('branch')
      .setDesc('target branch')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.branch)
          .onChange(async (value) => {
            parms.required.branch = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('token')
      .setDesc('Github token')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.token)
          .onChange(async (value) => {
            parms.required.token = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('message')
      .setDesc('commit message')
      .addText((text) => {
        text
          .setPlaceholder('')
          .setValue(parms.required.message)
          .onChange(async (value) => {
            parms.required.message = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('path')
      .setDesc('target path')
      .addText((text) => {
        text
          .setPlaceholder('obsidian/ -> obsidian/pic.png')
          .setValue(parms.path)
          .onChange(async (value) => {
            parms.path = value
            await plugin.saveSettings()
          })
      })
    new Setting(el)
      .setName('random filename')
      .setDesc('Random file names will greatly avoid duplicate file names. If you are sure that you need to use the original file name during this upload, make sure that no duplicate naming will occur under the path you choose.')
      .addToggle((toggle) => {
        toggle.setValue(parms.random)
        toggle.onChange(async (value) => {
          parms.random = value
          await plugin.saveSettings()
        })
      })
  }
}
