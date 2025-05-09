import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appArabicTextFormat]',
  standalone: true
})
export class ArabicTextFormatDirective {
  @Input() allowNumbers = true;
  @Input() allowSpecialChars = false;
  @Input() maxLength = 0;

  private arabicRegex: RegExp;
  private numbersRegex = /^[0-9\u0660-\u0669\u06F0-\u06F9]$/;
  private specialCharsRegex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0020\u0027\u002C\u002E\u002F\u003A\u003B\u003F\u0021\u0022\u0023\u0024\u0025\u0026\u0028\u0029\u002A\u002B\u002D\u003C\u003D\u003E\u0040\u005B\u005C\u005D\u005E\u005F\u0060\u007B\u007C\u007D\u007E]$/;

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
      if (!this.isValidText(pastedInput)) {
        event.preventDefault();
      }
    }
  }

  @HostListener('input')
  onInput(): void {
    const value = this.elementRef.nativeElement.value;
    if (value) {
      // Format Arabic text
      const formattedValue = this.formatArabicText(value);
      if (formattedValue !== value) {
        this.elementRef.nativeElement.value = formattedValue;
      }
    }
  }

  private updateRegex(): void {
    // Basic Arabic text regex
    this.arabicRegex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]$/;
  }

  private isValidKey(key: string): boolean {
    if (this.arabicRegex.test(key)) {
      return true;
    }

    if (this.allowNumbers && this.numbersRegex.test(key)) {
      return true;
    }

    if (this.allowSpecialChars && this.specialCharsRegex.test(key)) {
      return true;
    }

    return false;
  }

  private isValidText(text: string): boolean {
    for (const char of text) {
      if (!this.isValidKey(char)) {
        return false;
      }
    }
    return true;
  }

  private formatArabicText(text: string): string {
    // Remove any non-Arabic characters if not allowed
    let formattedText = text;
    
    if (!this.allowNumbers) {
      formattedText = formattedText.replace(/[0-9\u0660-\u0669\u06F0-\u06F9]/g, '');
    }

    if (!this.allowSpecialChars) {
      formattedText = formattedText.replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '');
    }

    // Apply max length if specified
    if (this.maxLength > 0 && formattedText.length > this.maxLength) {
      formattedText = formattedText.substring(0, this.maxLength);
    }

    return formattedText;
  }
} 