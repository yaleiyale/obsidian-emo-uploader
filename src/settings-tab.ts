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

        /*new Setting(containerEl)
            .setName("Upload Body")
            .setDesc("The body of upload request in json format. Do NOT change it unless you know what you are doing.")
            .addTextArea((text) => {
                text
                    .setPlaceholder("")
                    .setValue(this.plugin.settings.uploadBody)
                    .onChange(async (value) => {
                        try {
                            this.plugin.settings.uploadBody = value;
                            await this.plugin.saveSettings();
                        }
                        catch (e) {
                            console.log(e)
                        }
                    })
                text.inputEl.rows = 5
                text.inputEl.cols = 40
            });*/

        /*new Setting(containerEl)
            .setName("Image Url Path")
            .setDesc("The path to the image url in http response.")
            .addText((text) => {
                text
                    .setPlaceholder("")
                    .setValue(this.plugin.settings.imageUrlPath)
                    .onChange(async (value) => {
                        this.plugin.settings.imageUrlPath = value;
                        await this.plugin.saveSettings();
                    })
            });*/
        /*new Setting(containerEl)
            .setName("Enable Resize")
            .setDesc("Resize the image before uploading")
            .addToggle((toggle) => {
                toggle
                    .setValue(this.plugin.settings.enableResize)
                    .onChange(async (value) => {
                        this.plugin.settings.enableResize = value;
                        this.display();
                    })
            })

        if (this.plugin.settings.enableResize) {
            new Setting(containerEl)
                .setName("Max Width")
                .setDesc("The image wider than this will be resized by the natural aspect ratio")
                .addText((text) => {
                    text
                        .setPlaceholder("")
                        .setValue(this.plugin.settings.maxWidth.toString())
                        .onChange(async (value) => {
                            this.plugin.settings.maxWidth = parseInt(value);
                            await this.plugin.saveSettings();
                        })
                });
        }*/
    }
}