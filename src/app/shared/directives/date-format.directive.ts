import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDateFormat]',
  standalone: true
})
export class DateFormatDirective {
  @Input() format = 'DD/MM/YYYY';
  @Input() separator = '/';

  private regex: RegExp;

  constructor(private elementRef: ElementRef) {
    this.updateRegex();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    const value = this.elementRef.nativeElement.value;

    // Allow: Backspace, Delete, Tab, Escape, Enter
    if ([
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ].includes(key)) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(key)) {
      return;
    }

    // Check if the key is a number or separator
    if (!this.regex.test(key)) {
      event.preventDefault();
      return;
    }

    // Format the input
    const formattedValue = this.formatDate(value + key);
    if (formattedValue !== value + key) {
      event.preventDefault();
      this.elementRef.nativeElement.value = formattedValue;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedInput = event.clipboardData?.getData('text/plain');
    if (pastedInput) {
      event.preventDefault();
      const formattedValue = this.formatDate(pastedInput);
      this.elementRef.nativeElement.value = formattedValue;
    }
  }

  private updateRegex(): void {
    this.regex = new RegExp(`^[0-9${this.separator}]$`);
  }

  private formatDate(value: string): string {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format according to the specified format
    let formattedValue = '';
    let digitIndex = 0;

    for (let i = 0; i < this.format.length; i++) {
      if (this.format[i] === 'D' || this.format[i] === 'M' || this.format[i] === 'Y') {
        if (digitIndex < digits.length) {
          formattedValue += digits[digitIndex];
          digitIndex++;
        }
      } else {
        formattedValue += this.format[i];
      }
    }

    return formattedValue;
  }
} 