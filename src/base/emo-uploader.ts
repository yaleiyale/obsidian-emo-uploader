import { EmoParms } from './emo-parms'

export abstract class EmoUploader {
  parms!: EmoParms
  abstract upload (file: File): Promise<string>
  isValid (): boolean { // check the necessary parameters, type: string
    let result = true
    for (const i in this.parms.required) {
      result &&= notEmpty(this.parms.required[i])
      if (!result) return false
    }
    return true
  }
}
function notEmpty (value: string): boolean {
  return value.length > 0
}
