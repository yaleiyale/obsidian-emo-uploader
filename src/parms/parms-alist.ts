import { EmoParms } from '../base/emo-parms'

export interface AlistParms extends EmoParms {
  required: Required
}

interface Required {
  domain: string
  username: string
  password: string
  uploadPath: string
}

export const ALIST_DEFAULT_PARMS: AlistParms = {
  required: {
    domain: 'https://alist.example.com',
    username: '',
    password: '',
    uploadPath: '上传的相对路径',
  }
}

