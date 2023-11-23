import type { CatboxParms } from './parms/parms-catbox'
import { CATBOX_DEFAULT_PARMS } from './parms/parms-catbox'
import type { CheveretoParms } from './parms/parms-chevereto'
import { CHEVERETO_DEFAULT_PARMS } from './parms/parms-chevereto'
import type { CloudinaryParms } from './parms/parms-cloudinary'
import { CLOUDINARY_DEFAULT_PARMS } from './parms/parms-cloudinary'
import type { GithubParms } from './parms/parms-github'
import { GITHUB_DEFAULT_PARMS } from './parms/parms-github'
import type { ImgbbParms } from './parms/parms-imgbb'
import { IMGBB_DEFAULT_PARMS } from './parms/parms-imgbb'
import type { ImgurParms } from './parms/parms-imgur'
import { IMGUR_DEFAULT_PARMS } from './parms/parms-imgur'
import type { ImgurlParms } from './parms/parms-imgurl'
import { IMGURL_DEFAULT_PARMS } from './parms/parms-imgurl'
import type { SmmsParms } from './parms/parms-smms'
import { SMMS_DEFAULT_PARMS } from './parms/parms-smms'
import type { AlistParms } from './parms/parms-alist'
import { ALIST_DEFAULT_PARMS } from './parms/parms-alist'

export interface Config { // data from data.json
  choice: HostingProvider
  github_parms: GithubParms
  smms_parms: SmmsParms
  imgurl_parms: ImgurlParms
  cloudinary_parms: CloudinaryParms
  imgbb_parms: ImgbbParms
  imgur_parms: ImgurParms
  catbox_parms: CatboxParms
  chevereto_parms: CheveretoParms
  alist_parms: AlistParms
}

export enum HostingProvider { // target hosting
  Github = 'Github',
  Cloudinary = 'Cloudinary',
  Catbox = 'Catbox',
  Imgur = 'Imgur',
  Smms = 'SM.MS',
  ImgURL = 'ImgURL',
  Imgbb = 'imgbb',
  Chevereto = 'chevereto',
  Alist = 'AList'
}

export const DEFAULT_SETTINGS: Config = {
  choice: HostingProvider.Github,
  github_parms: GITHUB_DEFAULT_PARMS,
  imgur_parms: IMGUR_DEFAULT_PARMS,
  cloudinary_parms: CLOUDINARY_DEFAULT_PARMS,
  smms_parms: SMMS_DEFAULT_PARMS,
  imgurl_parms: IMGURL_DEFAULT_PARMS,
  imgbb_parms: IMGBB_DEFAULT_PARMS,
  catbox_parms: CATBOX_DEFAULT_PARMS,
  chevereto_parms: CHEVERETO_DEFAULT_PARMS,
  alist_parms: ALIST_DEFAULT_PARMS
}
