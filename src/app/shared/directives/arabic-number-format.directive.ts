import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appArabicNumberFormat]',
  standalone: true
})
export class ArabicNumberFormatDirective {
  @Input() allowDecimals = false;
  @Input() allowNegative = false;
  @Input() maxLength = 0;
  @Input() useArabicNumbers = true;

  private regex: RegExp;
  private arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  private englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

    // Check if the key is valid
    if (!this.isValidKey(key)) {
      event.preventDefault();
      return;
    }

    // Check max length
    if (this.maxLength > 0 && value.length >= this.maxLength) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedInput = event.clipboardData?.getData('text/plain');
    if (pastedInput) {
      event.preventDefault();
      const formattedValue = this.formatNumber(pastedInput);
      this.elementRef.nativeElement.value = formattedValue;
    }
  }

  @HostListener('input')
  onInput(): void {
    const value = this.elementRef.nativeElement.value;
    if (value) {
      const formattedValue = this.formatNumber(value);
      if (formattedValue !== value) {
        this.elementRef.nativeElement.value = formattedValue;
      }
    }
  }

  private updateRegex(): void {
    let pattern = '^[0-9';
    if (this.allowDecimals) {
      pattern += '\\.';
    }
    if (this.allowNegative) {
      pattern += '-';
    }
    pattern += ']$';
    this.regex = new RegExp(pattern);
  }

  private isValidKey(key: string): boolean {
    // Check if key is a number or allowed special character
    if (this.regex.test(key)) {
      return true;
    }

    // Check if key is an Arabic number
    if (this.useArabicNumbers && this.arabicNumbers.includes(key)) {
      return true;
    }

    return false;
  }

  private formatNumber(value: string): string {
    // Remove any non-digit characters except decimal separator and minus sign
    let formattedValue = value.replace(/[^\d.-]/g, '');

    // Convert Arabic numbers to English if needed
    if (this.useArabicNumbers) {
      for (let i = 0; i < this.arabicNumbers.length; i++) {
        formattedValue = formattedValue.replace(new RegExp(this.arabicNumbers[i], 'g'), this.englishNumbers[i]);
      }
    }

    // Handle negative numbers
    if (this.allowNegative) {
      const hasNegative = formattedValue.includes('-');
      formattedValue = formattedValue.replace(/-/g, '');
      if (hasNegative) {
        formattedValue = '-' + formattedValue;
      }
    }

    // Handle decimal numbers
    if (this.allowDecimals) {
      const parts = formattedValue.split('.');
      if (parts.length > 2) {
        formattedValue = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      formattedValue = formattedValue.replace(/\./g, '');
    }

    // Apply max length
    if (this.maxLength > 0 && formattedValue.length > this.maxLength) {
      formattedValue = formattedValue.substring(0, this.maxLength);
    }

    // Convert back to Arabic numbers if needed
    if (this.useArabicNumbers) {
      for (let i = 0; i < this.englishNumbers.length; i++) {
        formattedValue = formattedValue.replace(new RegExp(this.englishNumbers[i], 'g'), this.arabicNumbers[i]);
      }
    }

    return formattedValue;
  }
} 