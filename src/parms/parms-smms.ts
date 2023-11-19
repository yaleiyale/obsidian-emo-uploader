import { EmoParms } from '../base/emo-parms'

export interface SmmsParms extends EmoParms {
  required: Required
}
interface Required {
  token: string
}
export const SMMS_DEFAULT_PARMS: SmmsParms = {
  required: {
    token: ''
  }
}
