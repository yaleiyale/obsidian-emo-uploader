// file2ArrayBuffer
export async function getArrayBuffer (file: File): Promise<any> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult: any
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      fileResult = reader.result
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}

// file2base64
export async function getBase64 (file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult: string
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileResult = reader.result as string
      fileResult = fileResult.slice(fileResult.indexOf(',') + 1)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}

// get a random filename
export function getRandomFileName (): string {
  const time = Date.parse(new Date().toString())
  return time.toString() + (Math.random() * 10086).toString(36).slice(-6)
}
