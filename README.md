# Obsidian Image Uploader

![](https://i.loli.net/2021/07/16/fxWBeLAESNc6tK9.gif)

This plugin uploads the image in your clipboard to any image hosting automatically when pasting.

## Getting started

### Settings

1. Api Endpoint: the Endpoint of the image hosting api.
2. Upload Header: the header of upload request in **json** format.
3. Upload Body: the body of upload request in **json** format. Don't change it unless you know what you are doing. 
4. Image Url Path: the path to the image url in http response.

### Examples

Take Imgur as an example. The upload request is something like this:

```shell
curl --location --request POST 'https://api.imgur.com/3/image' \
--header 'Authorization: Client-ID {{clientId}}' \
--form 'image="R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"'
```

So, `Api Endpoint` should be `https://api.imgur.com/3/` and  `Upload Header` should be `{"Authorization": "Client-ID {{clientId}}"}`.

The response of the upload request is:
```json
{
	"data": {
		"id": "orunSTu",
		"title": null,
		"description": null,
		"datetime": 1495556889,
		"type": "image/gif",
		"animated": false,
		"width": 1,
		"height": 1,
		"size": 42,
		"views": 0,
		"bandwidth": 0,
		"vote": null,
		"favorite": false,
		"nsfw": null,
		"section": null,
		"account_url": null,
		"account_id": 0,
		"is_ad": false,
		"in_most_viral": false,
		"tags": [],
		"ad_type": 0,
		"ad_url": "",
		"in_gallery": false,
		"deletehash": "x70po4w7BVvSUzZ",
		"name": "",
		"link": "http://i.imgur.com/orunSTu.gif"
	},
	"success": true,
	"status": 200
}
```

All you need is the image url `http://i.imgur.com/orunSTu.gif`, so `Image Url Path` should be `data.link`.

## Thanks
1. [obsidian-imgur-plugin](https://github.com/gavvvr/obsidian-imgur-plugin)
2. [create-obsidian-plugin](https://www.npmjs.com/package/create-obsidian-plugin)
