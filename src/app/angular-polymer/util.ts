import { ElementRef } from '@angular/core';

const Polymer = (<any>window).Polymer;
const customElements = (<any>window).customElements;

export function getCustomElementClass(elementRef: ElementRef): Function {
  if (elementRef && elementRef.nativeElement) {
    const htmlElement = Object.getPrototypeOf(elementRef.nativeElement);
    if (htmlElement && htmlElement.is) {
      return customElements.get(htmlElement.is);
    } else {
      console.warn(`${getTagName(elementRef)} is not registered`);
    }
  }
}

export function getTagName(elementRef: ElementRef): string {
  return elementRef && `<${elementRef.nativeElement.tagName.toLowerCase()}>`;
}
