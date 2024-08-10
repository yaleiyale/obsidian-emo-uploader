import type { EmoParms } from '../base/emo-parms'

export interface EasyImageParms extends EmoParms {
  required: Required
}

interface Required {
  domain: string
  token: string
}

export const EASYIMAGE_DEFAULT_PARMS: EasyImageParms = {
  required: {
    domain: '',
    token: ''
  }
}
