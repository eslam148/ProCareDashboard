import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true
})
export class CurrencyFormatDirective {
  @Input() currency = '$';
  @Input() decimalSeparator = '.';
  @Input() thousandsSeparator = ',';
  @Input() decimalPlaces = 2;
  @Input() allowNegative = false;

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
    const formattedValue = this.formatCurrency(value + key);
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
      const formattedValue = this.formatCurrency(pastedInput);
      this.elementRef.nativeElement.value = formattedValue;
    }
  }

  private updateRegex(): void {
    let pattern = '^[0-9';
    if (this.allowNegative) {
      pattern += '-';
    }
    pattern += this.decimalSeparator + ']$';
    this.regex = new RegExp(pattern);
  }

  private formatCurrency(value: string): string {
    // Remove all non-digit characters except decimal separator and minus sign
    const digits = value.replace(/[^\d.-]/g, '');

    // Split into integer and decimal parts
    const parts = digits.split(this.decimalSeparator);
    const integerPart = parts[0].replace(/[^\d-]/g, '');
    const decimalPart = parts[1] || '';

    // Format integer part with thousands separator
    let formattedInteger = '';
    const integerDigits = integerPart.replace(/-/g, '');
    for (let i = 0; i < integerDigits.length; i++) {
      if (i > 0 && (integerDigits.length - i) % 3 === 0) {
        formattedInteger += this.thousandsSeparator;
      }
      formattedInteger += integerDigits[i];
    }

    // Add minus sign if present
    if (integerPart.startsWith('-')) {
      formattedInteger = '-' + formattedInteger;
    }

    // Format decimal part
    let formattedDecimal = '';
    if (decimalPart) {
      formattedDecimal = this.decimalSeparator + decimalPart.substring(0, this.decimalPlaces);
    } else if (this.decimalPlaces > 0) {
      formattedDecimal = this.decimalSeparator + '0'.repeat(this.decimalPlaces);
    }

    // Combine parts
    return this.currency + formattedInteger + formattedDecimal;
  }
} 