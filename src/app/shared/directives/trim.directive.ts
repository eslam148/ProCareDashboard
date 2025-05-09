import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrim]',
  standalone: true
})
export class TrimDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('blur')
  onBlur(): void {
    const value = this.elementRef.nativeElement.value;
    if (value) {
      this.elementRef.nativeElement.value = value.trim();
    }
  }
} 