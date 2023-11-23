import type { EmoParms } from '../base/emo-parms'

export interface CheveretoParms extends EmoParms {
  required: Required
}

interface Required {
  domain: string
  token: string
}

export const CHEVERETO_DEFAULT_PARMS: CheveretoParms = {
  required: {
    domain: '',
    token: ''
  }
}
