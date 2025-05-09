import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLowercase]',
  standalone: true
})
export class LowercaseDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    const value = this.elementRef.nativeElement.value;
    if (value) {
      this.elementRef.nativeElement.value = value.toLowerCase();
    }
  }
} 