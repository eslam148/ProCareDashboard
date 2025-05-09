import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTimeFormat]',
  standalone: true
})
export class TimeFormatDirective {
  @Input() format = 'HH:mm';
  @Input() separator = ':';
  @Input() use24Hour = true;

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
    const formattedValue = this.formatTime(value + key);
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
      const formattedValue = this.formatTime(pastedInput);
      this.elementRef.nativeElement.value = formattedValue;
    }
  }

  private updateRegex(): void {
    this.regex = new RegExp(`^[0-9${this.separator}]$`);
  }

  private formatTime(value: string): string {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format according to the specified format
    let formattedValue = '';
    let digitIndex = 0;

    for (let i = 0; i < this.format.length; i++) {
      if (this.format[i] === 'H' || this.format[i] === 'h' || this.format[i] === 'm') {
        if (digitIndex < digits.length) {
          formattedValue += digits[digitIndex];
          digitIndex++;
        }
      } else {
        formattedValue += this.format[i];
      }
    }

    // Validate hours
    if (this.use24Hour) {
      const hours = parseInt(formattedValue.split(this.separator)[0]);
      if (hours > 23) {
        formattedValue = '23' + formattedValue.substring(2);
      }
    } else {
      const hours = parseInt(formattedValue.split(this.separator)[0]);
      if (hours > 12) {
        formattedValue = '12' + formattedValue.substring(2);
      }
    }

    // Validate minutes
    const minutes = parseInt(formattedValue.split(this.separator)[1]);
    if (minutes > 59) {
      formattedValue = formattedValue.substring(0, 3) + '59';
    }

    return formattedValue;
  }
} 