export interface ImgurParms {
  required: Required
  clientid: string
}
interface Required {
  emoid: string
}
export const IMGUR_DEFAULT_PARMS: ImgurParms = {
  required: {
    emoid: '4547d4aee97ce8f'
  },
  clientid: ''
}
