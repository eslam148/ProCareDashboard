import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPercentageFormat]',
  standalone: true
})
export class PercentageFormatDirective {
  @Input() decimalPlaces = 2;
  @Input() allowNegative = false;
  @Input() maxValue = 100;

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

    // Check if the key is a number or allowed special character
    if (!this.regex.test(key)) {
      event.preventDefault();
      return;
    }

    // Format the input
    const formattedValue = this.formatPercentage(value + key);
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
      const formattedValue = this.formatPercentage(pastedInput);
      this.elementRef.nativeElement.value = formattedValue;
    }
  }

  private updateRegex(): void {
    let pattern = '^[0-9';
    if (this.allowNegative) {
      pattern += '-';
    }
    pattern += '.]$';
    this.regex = new RegExp(pattern);
  }

  private formatPercentage(value: string): string {
    // Remove all non-digit characters except decimal separator and minus sign
    const digits = value.replace(/[^\d.-]/g, '');

    // Split into integer and decimal parts
    const parts = digits.split('.');
    const integerPart = parts[0].replace(/[^\d-]/g, '');
    const decimalPart = parts[1] || '';

    // Format integer part
    let formattedInteger = integerPart;

    // Add minus sign if present
    if (integerPart.startsWith('-')) {
      formattedInteger = '-' + formattedInteger.substring(1);
    }

    // Format decimal part
    let formattedDecimal = '';
    if (decimalPart) {
      formattedDecimal = '.' + decimalPart.substring(0, this.decimalPlaces);
    } else if (this.decimalPlaces > 0) {
      formattedDecimal = '.' + '0'.repeat(this.decimalPlaces);
    }

    // Combine parts
    const formattedValue = formattedInteger + formattedDecimal;

    // Validate max value
    const numericValue = parseFloat(formattedValue);
    if (numericValue > this.maxValue) {
      return this.maxValue.toFixed(this.decimalPlaces) + '%';
    }

    return formattedValue + '%';
  }
} 