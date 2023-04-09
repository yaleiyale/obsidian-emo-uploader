# Obsidian Cloudinary Uploader

![Downloads](https://img.shields.io/github/downloads/jordanhandy/obsidian-cloudinary-uploader/main.js.svg)
![Version](https://img.shields.io/github/manifest-json/v/jordanhandy/obsidian-cloudinary-uploader?color=blue)

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
5. Optional configuration
    - Cloudinary default transformation parameters

## Unsigned vs. Signed Uploads to Cloudinary
The uploads to Cloudinary are unsigned.  [You can read more about that here](https://cloudinary.com/documentation/upload_images#unsigned_upload).  A signed upload would require the use of an API key and secret, and I opted against asking for that in the plugin configuration, as a choice for security reasons.

## Transformations
Cloudinary allows for on-the-fly image transformations using their API.  To the end-user, this is accomplished by making a simple URL modification to the resulting URL that Cloudinary gives back when an upload completes.  You can [read more about Cloudinary's transformation parameters here](https://cloudinary.com/documentation/transformation_reference).
As of version 0.2.0, you can now set a default transformation to be applied to all of your uploads with a comma-delimited list.  **Be mindful of syntax**, as using the incorrect transformation parameters will cause your images to not render in Obsidian.  

If this were to happen, this can be fixed by simply modifying the URL following the upload. 

**Be Mindful of your [transformation token allotment](https://cloudinary.com/blog/understanding_cloudinary_s_transformation_quotas)**.  Depending on your plan, Cloudinary allows for an 'x' number of transformations to take place per month.  Keep this count in mind as you apply transformations to your uploads
## Thanks
Special thanks to:
1. @Creling and [their repo here](https://github.com/Creling/obsidian-image-uploader).  As this was my first time creating an Obsidian plugin, their base really helped.  
2. [Obsidian Unofficial Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/)