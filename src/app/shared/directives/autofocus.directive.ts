import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements OnInit {
  @Input() appAutofocus = true;
  @Input() delay = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.appAutofocus) {
      setTimeout(() => {
        this.elementRef.nativeElement.focus();
      }, this.delay);
    }
  }
} 