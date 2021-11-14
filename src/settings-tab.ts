/*
 * @Author: Creling
 * @Date: 2021-07-15 23:54:03
 * @LastEditors: Creling
 * @LastEditTime: 2021-08-04 22:52:34
 * @Description: file content
 */
import {
    App,
    PluginSettingTab,
    Setting,
} from 'obsidian';

import ImageUploader from './main'

export default class ImageUploaderSettingTab extends PluginSettingTab {
    plugin: ImageUploader;
    constructor(app: App, plugin: ImageUploader) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl("h3", { text: "Image Hosting Setting" });

        new Setting(containerEl)
            .setName("Api Endpoint")
            .setDesc("The endpoint of the image hosting api.")
            .addText((text) => {
                text
                    .setPlaceholder("")
                    .setValue(this.plugin.settings.apiEndpoint)
                    .onChange(async (value) => {
                        this.plugin.settings.apiEndpoint = value;
                        await this.plugin.saveSettings();
                    })
            }
            );

        new Setting(containerEl)
            .setName("Upload Header")
            .setDesc("The header of upload request in json format.")
            .addTextArea((text) => {
                text
                    .setPlaceholder("")
                    .setValue(this.plugin.settings.uploadHeader)
                    .onChange(async (value) => {
                        try {
                            this.plugin.settings.uploadHeader = value;
                            await this.plugin.saveSettings();
                        }
                        catch (e) {
                            console.log(e)
                        }
                    })
                text.inputEl.rows = 5
                text.inputEl.cols = 40
            });

        new Setting(containerEl)
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
            });

        new Setting(containerEl)
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
            });
        new Setting(containerEl)
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
        }
    }
}