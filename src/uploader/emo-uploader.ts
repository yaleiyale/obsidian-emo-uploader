export abstract class EmoUploader {
  required: any // string inside
  abstract upload (file: File): Promise<string>
  isValid (): boolean { // check the necessary parameters, type: string
    let result = true
    for (const i in this.required) {
      result &&= notEmpty(this.required[i])
      if (!result) return false
    }
    return true
  }
}
function notEmpty (value: string): boolean {
  return value.length > 0
}
