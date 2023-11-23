import type { EmoParms } from '../base/emo-parms'

export interface CatboxParms extends EmoParms {
  required: Required
}

interface Required {
  userhash: string
}

export const CATBOX_DEFAULT_PARMS: CatboxParms = {
  required: {
    userhash: ''
  }
}
