export interface GithubParms {
  required: Required
  path: string
  random: boolean
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
    message: 'upload from emo-uploader·Github'
  },
  path: '',
  random: true
}
