/*
 * @Author: Jordan Handy
 */
import {
    App,
    PluginSettingTab,
    Setting,
} from 'obsidian';

import CloudinaryUploader from './main'

export default class CloudinaryUploaderSettingTab extends PluginSettingTab {
    plugin: CloudinaryUploader;
    constructor(app: App, plugin: CloudinaryUploader) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl("h3", { text: "Cloudinary Settings" });

        new Setting(containerEl)
            .setName("Cloud Name")
            .setDesc("The name of your Cloudinary Cloud Account")
            .addText((text) => {
                text
                    .setPlaceholder("")
                    .setValue(this.plugin.settings.cloudName)
                    .onChange(async (value) => {
                        this.plugin.settings.cloudName = value;
                        await this.plugin.saveSettings();
                    })
            }
            );

        new Setting(containerEl)
            .setName("Cloudinary Upload Template")
            .setDesc("Cloudinary Upload Preference string")
            .addText((text) => {
                text
                    .setPlaceholder("")
                    .setValue(this.plugin.settings.uploadPreset)
                    .onChange(async (value) => {
                        try {
                            this.plugin.settings.uploadPreset = value;
                            await this.plugin.saveSettings();
                        }
                        catch (e) {
                            console.log(e)
                        }
                    })
            });
            new Setting(containerEl)
            .setName("Cloudinary Upload Folder")
            .setDesc("Folder name to use in Cloudinary.  Note, this will be ignored if you have a folder set in your Cloudinary Upload Preset")
            .addText((text) => {
                text
                    .setPlaceholder("obsidian")
                    .setValue(this.plugin.settings.folder)
                    .onChange(async (value) => {
                        try {
                            this.plugin.settings.folder = value;
                            await this.plugin.saveSettings();
                        }
                        catch (e) {
                            console.log(e)
                        }
                    })
            });
    }
}