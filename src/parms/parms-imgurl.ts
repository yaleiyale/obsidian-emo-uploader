import { EmoParms } from '../base/emo-parms'

export interface ImgurlParms extends EmoParms {
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
