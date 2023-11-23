import type { EmoParms } from '../base/emo-parms'
export enum CDNprovider { // Github CDN
  jsdelivr = 'jsdelivr',
  statically = 'statically',
  raw = 'raw'
}
export interface GithubParms extends EmoParms {
  required: Required
  path: string
  random: boolean
  cdn: CDNprovider
}

interface Required {
  owner: string
  repo: string
  branch: string
  token: string
  message: string
}
export const GITHUB_DEFAULT_PARMS: GithubParms = {
  required: {
    owner: '',
    repo: '',
    branch: 'main',
    token: '',
    message: 'from emo-uploader·Github'
  },
  path: '',
  random: true,
  cdn: CDNprovider.raw
}
