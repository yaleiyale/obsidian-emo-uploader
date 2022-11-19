import { EmoParms } from '../base/emo-parms'

export interface ImgbbParms extends EmoParms {
  required: Required
}
interface Required {
  key: string
}
export const IMGBB_DEFAULT_PARMS: ImgbbParms = {
  required: {
    key: ''
  }
}
