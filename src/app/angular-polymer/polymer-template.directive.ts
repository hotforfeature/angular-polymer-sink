import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[polymer-template]'
})
export class PolymerTemplateDirective {
  constructor(public view: ViewContainerRef, public templateRef: TemplateRef<any>) {
    const parentElement: HTMLElement = view.element.nativeElement.parentElement;
    const template = document.createElement('template');
    const viewRef = view.createEmbeddedView(templateRef);
    viewRef.rootNodes.forEach(rootNode => {
      parentElement.removeChild(rootNode);
      template.content.appendChild(rootNode);
    });

    parentElement.appendChild(template);

    // Detach and re-attach the parent element. This will trigger any template attaching logic
    // that a custom elements needs which Angular skipped when using <ng-template>
    const hostElement = parentElement.parentElement;
    const parentElementIndex = Array.from(hostElement.children).indexOf(parentElement);
    const parentSibling = parentElement.nextSibling;
    hostElement.removeChild(parentElement);
    if (parentSibling) {
      hostElement.insertBefore(parentSibling, parentElement);
    } else {
      hostElement.appendChild(parentElement);
    }
  }
}
