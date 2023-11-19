import { EmoParms } from '../base/emo-parms'

export interface CloudinaryParms extends EmoParms {
  required: Required
  folder: string
}

interface Required {
  name: string
  present: string
}

export const CLOUDINARY_DEFAULT_PARMS: CloudinaryParms = {
  required: {
    name: '',
    present: ''
  },
  folder: ''
}
