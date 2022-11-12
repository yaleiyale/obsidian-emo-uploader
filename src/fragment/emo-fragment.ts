import { HostingProvider } from '../config'
import Emo from '../main'

export abstract class EmoFragment {
  kind: HostingProvider
  element: HTMLDivElement
  constructor (name: string, kind: HostingProvider, el: HTMLElement, plugin: Emo) {
    this.kind = kind
    this.element = el.createDiv(name)
    this.display(this.element, plugin)
    this.element.hide()
  }
  abstract display (el: HTMLElement, plugin: Emo): void

  update (choice: HostingProvider): void {
    this.kind === choice ? this.element.show() : this.element.hide()
  }
}
