import { EmoParms } from '../base/emo-parms'

export interface ImgurParms extends EmoParms {
  required: Required
  clientid: string
  anonymous: boolean
}
interface Required {
  emoid: string
}
export const IMGUR_DEFAULT_PARMS: ImgurParms = {
  required: {
    emoid: '4547d4aee97ce8f'
  },
  clientid: '',
  anonymous: true
}
