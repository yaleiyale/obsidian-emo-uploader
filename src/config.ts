import { CatboxParms, CATBOX_DEFAULT_PARMS } from './parms/parms-catbox'
import { CloudinaryParms, CLOUDINARY_DEFAULT_PARMS } from './parms/parms-cloudinary'
import { GithubParms, GITHUB_DEFAULT_PARMS } from './parms/parms-github'
import { ImgbbParms, IMGBB_DEFAULT_PARMS } from './parms/parms-imgbb'
import { ImgurParms, IMGUR_DEFAULT_PARMS } from './parms/parms-imgur'
import { ImgurlParms, IMGURL_DEFAULT_PARMS } from './parms/parms-imgurl'
import { SmmsParms, SMMS_DEFAULT_PARMS } from './parms/parms-smms'

export interface Config { // data from data.json
  choice: HostingProvider
  github_parms: GithubParms
  smms_parms: SmmsParms
  imgurl_parms: ImgurlParms
  cloudinary_parms: CloudinaryParms
  imgbb_parms: ImgbbParms
  imgur_parms: ImgurParms
  catbox_parms: CatboxParms
}

export enum HostingProvider { // target hosting
  Github = 'Github',
  Cloudinary = 'Cloudinary',
  Catbox = 'Catbox',
  Imgur = 'Imgur',
  Smms = 'SM.MS',
  ImgURL = 'ImgURL',
  Imgbb = 'imgbb',
}

export const DEFAULT_SETTINGS: Config = {
  choice: HostingProvider.Github,
  github_parms: GITHUB_DEFAULT_PARMS,
  imgur_parms: IMGUR_DEFAULT_PARMS,
  cloudinary_parms: CLOUDINARY_DEFAULT_PARMS,
  smms_parms: SMMS_DEFAULT_PARMS,
  imgurl_parms: IMGURL_DEFAULT_PARMS,
  imgbb_parms: IMGBB_DEFAULT_PARMS,
  catbox_parms: CATBOX_DEFAULT_PARMS
}
