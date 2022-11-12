export interface CloudinaryParms {
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
