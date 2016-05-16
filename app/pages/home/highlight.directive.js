// Angular
import { Directive, ElementRef, Input } from 'angular2/core';


@Directive({
  selector: '[card-highlight]',
  // host: {
  //   '(click)': 'onClick()',
  // }
})
export class HighlightDirective {
    static get parameters() {
      return [[ElementRef]];
    }

    // @Input('card-highlight') is_highlights;

    constructor(el) {
      this.el = el.nativeElement;
      this.is_highlighted = false;
    }

    onClick() {
      if (this.is_highlighted) {
        this.el.style.boxShadow = null;
      } else {
        this.el.style.boxShadow = '0px 3px 5px 5px #00ff00';
      }
      this.is_highlighted = !this.is_highlighted;
    }

}
