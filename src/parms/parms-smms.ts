export interface SmmsParms {
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
