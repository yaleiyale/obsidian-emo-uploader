export interface ImgbbParms {
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
