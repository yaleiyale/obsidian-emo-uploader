# Obsidian Cloudinary Uploader
## What is it?
[Cloudinary](https://cloudinary.com/) is a cloud storage platform that allows you to upload various media files to a storage account.  The media files within this storage account can then be manipulated using Cloudinary's APIs to manipulate the data properties and metadata.

This plugin allows you to automatically upload images pasted to Obsidian directly into your Cloudinary account (instead of stored locally).  Note:  There is no functionality for media manipulation in this plugin.
## How it Works
![Action GIF](https://res.cloudinary.com/dakfccuv5/image/upload/v1636859613/Nov-13-2021_22-11-40_bpei0d.gif)
## Configuration
1. Disable Obsidian Safe Mode
2. Install the Plugin
    - Clone this repo
    - Install dependencies with `yarn` or `npm`
    - `npm run dev` will start compilation
3. Enable the Plugin
4. Configure the settings and set your:
    - Cloud Name
    - Upload Preset Name ([Set that here](https://support.cloudinary.com/hc/en-us/articles/360018796451-Unsigned-Uploads-Security-Considerations))
    - Set a Folder Name
## Thanks
Special thanks to:
1. @Creling and [their repo here](https://github.com/Creling/obsidian-image-uploader).  As this was my first time creating an Obsidian plugin, their base really helped.  
2. [Obsidian Unofficial Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/)