# Obsidian Emo Uploader

<p align="center">
		<img src="https://img.shields.io/github/release-date/yaleiyale/obsidian-emo-uploader?style=for-the-badge">
      <img src="https://img.shields.io/github/downloads/yaleiyale/obsidian-emo-uploader/total?style=for-the-badge">
      <img src="https://img.shields.io/github/license/yaleiyale/obsidian-emo-uploader?style=for-the-badge">
      <img src="https://img.shields.io/github/stars/yaleiyale/obsidian-emo-uploader?style=for-the-badge">
      <img src="https://www.codefactor.io/repository/github/yaleiyale/obsidian-emo-uploader/badge?style=for-the-badge">
</p>

Embed markdown online file/image links.  
This plugin is for uploading **images** to hosting platform or **files** to Github in Obsidian.  

**图床聚合 & Github上传器**  

Starting from version 2.6, clipboard and drag files are supported; Non-image files will appear as links without "!" at the beginning by default after being embed in markdown.

🚩 [中文](https://lestua.eu.org/notes/2022/10/16/172318)  

## How it Works

<video src="https://user-images.githubusercontent.com/55282569/200258839-0979aa8c-7e5b-4254-bbe3-b9eeff458a40.mp4" controls="controls"></video>

Support list

- [GitHub](https://github.com/)
- [Imgur](https://imgur.com/)
- [SM.MS](https://smms.app/)
- [ImgURL](https://www.imgurl.org/)
- [Clouinary](https://cloudinary.com/)
- [imgbb](https://imgbb.com/)

## Configuration

1. Disable Obsidian Safe Mode
2. Install the Plugin
   - Install from the Obsidian Community Plugins tab
   - use Release
      - download **main.js manifest.json or zip file** in the latest Release
      - move **main.js manifest.json** in a folder in your obsidian vault's plugin folder
   - Manual install
      - Clone this repo
      - Install dependencies with `yarn` or `npm` like `npm install`
      - `yarn run dev` will start compilation
3. Enable the Plugin
4. Configure the settings 👉 [some datails: take configuring github as an example](https://lestua.eu.org/notes/2022/10/16/172318#english)
5. Enjoy convenience 🌟

## About Uploading to Github

For uninitiated visitors from outside the code world, Github is a famous internet hosting service for software development and version control using Git.  
If you need more help on hosting **images**, go to [the other parts](https://github.com/yaleiyale/obsidian-emo-uploader#about-the-other). These services are more focused on this.    

### What is It?

This part allows you to automatically upload **files** pasted to Obsidian directly into your Github repository ( instead of stored locally ). It's useful when you want to mention a file in your note which you think is good for sharing like script, config-file or anything.  
Of course, it can be a simple image uploader. It does a good job of embedding images into markdown files.  
But more than a image uploader, You can upload **various types of files**, as long as Github accepts them.  
Whether the file link can be rendered in obsidian or not depends on the support of obsidian itself. It doesn't matter, even if they can't be rendered, they can still be used as links. 🍭 Just remove the exclamation point at the beginning.  

### About Use Policy

[GitHub terms-of-service](https://docs.github.com/cn/site-policy/github-terms/github-terms-of-service)  
[jsdelivr Use Policy](https://www.jsdelivr.com/terms/acceptable-use-policy-jsdelivr-net)  

⚠️ **Note that**

1. The Github target repository must be public, which means that all files uploaded are public. Github should also be more for those who are happy to share. Please make sure that it is harmless for you to share the files you upload. Personally, I'm looking forward to the day when one of your uploads will be for selfless sharing.  🌻  
2. Do not upload Empty file. It's meaningless and wrong here.
3. It is recommended to check the random filename in the panel. Duplicate file name will raise an error. Random file names will greatly avoid duplicate file names.  
4. In general, Github is generous enough. But you need to get a sense of proportion, **don't abuse Github's services too hard**. Take it easy, normal use, such as in Github pages, is of course acceptable. But if you need to use images in large quantities, please use a professional image hosting service. ( Now it has been integrated into this plugin ). Going beyond the normal range (e.g. storing more than **1GB files in a single repository**), abusing Github, and uploading bad files with undesirable effects may cause your Github repository or even account to be affected.
5. I use [jsdelivr](https://www.jsdelivr.com/) here. It is free. Just like above, don't abuse it. Just like what I do in the video, it's not good to use jsdelivr on transferring large video, I have deleted it. *My case is a small size video*. 😼

## About the Other

[ImgURL](https://www.imgurl.org/), [SM.MS](https://smms.app/) are cloud storage platforms that allows you to upload **images** to a storage account. For users living in China, they are easier to access than Github and Cloudinary.  
Register an account and find parameters you need. Just put your parameters to the correct positions. Then you can use it just like the way in the video.

About [Cloudinary](https://cloudinary.com/), please refer to [obsidian-cloudinary-uploader/README.md](https://github.com/jordanhandy/obsidian-cloudinary-uploader/blob/main/README.md). Of course, Cloudinary is supported here. If you find that Cloudinary is enough to meet your needs, you can just use it. ( In fact, my plugin is smaller on size. 😳 )

If you live in China, [imgbb](https://imgbb.com/) is not recommended to use. I found that the pictures uploaded to this platform could not be easily accessed in Chinese Mainland and they are usually presented as thumbnails.

~~[Imgur](https://imgur.com/) is good. But in my network environment, it is not easy to access and test. I simply implemented anonymous upload with reference to some posts.~~Thanks for this [reference](https://github.com/gavvvr/obsidian-imgur-plugin). When using imgur, deletehash will appear in the form of `![deletehash](url)`, which is used to prevent you from regretting the upload of wrong pictures. You can delete them [here](https://lestua.eu.org/imgurdeleteimage) or in the plugin.

⚠️ Images are public to see on them. Don't upload prohibited things! Please check the service restrictions by yourself.

## How to Extend

Want to support more platforms? If you don't want to make too much effort, you can extend it in the following ways.  

- Refer to existing files, and add the parameters required by your new *uploader* by adding files to `src/Parms`.
- Use your *parms* interface. In `config.ts`, add parameter configurations about your *uploader* to provide choices and act as constructors for *uploader* at run time.
- Implement your *uploader* and *settings panel* by adding files to `src/Uploader, src/Fragment`.
- In `settings-tab.ts`,add your *fragment* to show and set parameters in the setting-tab.
- Add your *uploader* to the switch judgment block in `main.ts`.
- Test it.

It's done! 😽

## Note

Due to the different range of files supported by different platforms, there are no restrictions on the types of files you paste in this plugin. This will lead to the situation that unsupported types are uploaded failed without a correct response. Fortunately, there are not many cases in which strange file types are embedded in documents. (there won't be many, right? )

If you need to embed the file as an attachment, please close the plugin temporarily.

In general, **Github** supports **any** file type, **Cloudinary** supports media type files such as **image(png), video(mp4) and audio(mp3)**, **SM.MS, ImgURL** (most hosting services) supports common **image** types.  

Trying to upload a file that the platform does not support or volume exceeds the upper limit may result in a string like `![](undefined)`. Notice it, don't just wait.  

---

If you are enjoying the plugin then you can support my work and enthusiasm by buying me a cola:  

<a id="cola" href="https://lestua.eu.org/donate/"><img src="https://s1.ax1x.com/2022/10/30/xIMoKU.png" alt="BuyMeACola" width="180" style="margin:auto"></a>

Thank you!

## Thanks

[obsidian-cloudinary-uploader](https://github.com/jordanhandy/obsidian-cloudinary-uploader)  
[Github REST API](https://docs.github.com/cn/rest)  
[jsdelivr](https://www.jsdelivr.com/)  
[SM.MS](https://smms.app/)  
[ImgURL](https://www.imgurl.org/)  
[Clouinary](https://cloudinary.com/)  
[Imgur](https://imgur.com/)  
[imgbb](https://imgbb.com/)  
[obsidian-imgur-plugin](https://github.com/gavvvr/obsidian-imgur-plugin)