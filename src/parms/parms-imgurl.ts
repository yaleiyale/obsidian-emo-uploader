export interface ImgurlParms {
  required: Required
}
interface Required {
  uid: string
  token: string
}
export const IMGURL_DEFAULT_PARMS: ImgurlParms = {
  required: {
    uid: '',
    token: ''
  }
}
