# Obsidian Cloudinary Uploader

![Downloads](https://img.shields.io/github/downloads/jordanhandy/obsidian-cloudinary-uploader/main.js.svg)

## Documentation
[Documentation](https://jordanhandy.github.io/obsidian-cloudinary-uploader/)
## What is it?
[Cloudinary](https://cloudinary.com/) is a cloud storage platform that allows you to upload various media files to a storage account.  The media files within this storage account can then be manipulated using Cloudinary's APIs to manipulate the data properties and metadata.

This plugin allows you to automatically upload images pasted to Obsidian directly into your Cloudinary account (instead of stored locally).  Note:  There is no functionality for media manipulation in this plugin.
## How it Works
![Action GIF](https://res.cloudinary.com/dakfccuv5/image/upload/v1636859613/Nov-13-2021_22-11-40_bpei0d.gif)
## Configuration
1. Disable Obsidian Safe Mode
2. Install the Plugin
    - Install from the Obsidian Community Plugins tab
    - Manual install
        - Clone this repo
        - Install dependencies with `yarn` or `npm`
        - `npm run dev` will start compilation
3. Enable the Plugin
4. Configure the settings and set your:
    - Cloud Name
    - Upload Preset Name ([Set that here](https://cloudinary.com/documentation/upload_presets))
    - Set a Folder Name

## Unsigned vs. Signed Uploads to Cloudinary
The uploads to Cloudinary are unsigned.  [You can read more about that here](https://cloudinary.com/documentation/upload_images#unsigned_upload).  A signed upload would require the use of an API key and secret, and I opted against asking for that in the plugin configuration, as a choice for security reasons.
## Thanks
Special thanks to:
1. @Creling and [their repo here](https://github.com/Creling/obsidian-image-uploader).  As this was my first time creating an Obsidian plugin, their base really helped.  
2. [Obsidian Unofficial Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/)