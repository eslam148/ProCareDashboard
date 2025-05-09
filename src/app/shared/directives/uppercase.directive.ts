import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    const value = this.elementRef.nativeElement.value;
    if (value) {
      this.elementRef.nativeElement.value = value.toUpperCase();
    }
  }
} 