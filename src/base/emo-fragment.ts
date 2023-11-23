import type { HostingProvider } from '../config'
import type Emo from '../main'

export abstract class EmoFragment {
  kind: HostingProvider
  element: HTMLDivElement
  protected constructor (kind: HostingProvider, el: HTMLElement, plugin: Emo) {
    this.kind = kind
    this.element = el.createDiv(kind)
    this.display(this.element, plugin)
    this.element.hide()
  }
  abstract display (el: HTMLElement, plugin: Emo): void

  update (choice: HostingProvider): void {
    this.kind === choice ? this.element.show() : this.element.hide()
  }
}
