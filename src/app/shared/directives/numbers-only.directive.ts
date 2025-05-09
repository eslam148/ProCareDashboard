import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true
})
export class NumbersOnlyDirective {
  @Input() allowDecimals = false;
  @Input() allowNegative = false;
  @Input() maxLength = 0;

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

    // Check max length
    if (this.maxLength > 0 && value.length >= this.maxLength) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    const pastedInput = event.clipboardData?.getData('text/plain');
    if (pastedInput) {
      if (!this.regex.test(pastedInput)) {
        event.preventDefault();
      }
    }
  }

  private updateRegex(): void {
    let pattern = '^[0-9]*$';
    if (this.allowDecimals) {
      pattern = '^[0-9]*\\.?[0-9]*$';
    }
    if (this.allowNegative) {
      pattern = '^-?[0-9]*\\.?[0-9]*$';
    }
    this.regex = new RegExp(pattern);
  }
} 