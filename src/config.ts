import { CloudinaryParms, CLOUDINARY_DEFAULT_PARMS } from './parms/parms-cloudinary'
import { GithubParms, GITHUB_DEFAULT_PARMS } from './parms/parms-github'
import { ImgbbParms, IMGBB_DEFAULT_PARMS } from './parms/parms-imgbb'
import { ImgurlParms, IMGURL_DEFAULT_PARMS } from './parms/parms-imgurl'
import { SmmsParms, SMMS_DEFAULT_PARMS } from './parms/parms-smms'

export interface Config { // data from data.json
  choice: HostingProvider
  github_parms: GithubParms
  smms_parms: SmmsParms
  imgurl_parms: ImgurlParms
  cloudinary_parms: CloudinaryParms
  imgbb_parms: ImgbbParms
}
export enum HostingProvider { // target hosting
  Github = 'Github',
  Smms = 'SM.MS',
  ImgURL = 'ImgURL',
  Cloudinary = 'Cloudinary',
  Imgbb = 'imgbb'
}

// for dropdown
export const supportList = [HostingProvider.Github, HostingProvider.Smms, HostingProvider.ImgURL, HostingProvider.Cloudinary,
  HostingProvider.Imgbb]

export const DEFAULT_SETTINGS: Config = {
  choice: HostingProvider.Github,
  github_parms: GITHUB_DEFAULT_PARMS,
  smms_parms: SMMS_DEFAULT_PARMS,
  imgurl_parms: IMGURL_DEFAULT_PARMS,
  cloudinary_parms: CLOUDINARY_DEFAULT_PARMS,
  imgbb_parms: IMGBB_DEFAULT_PARMS
}
