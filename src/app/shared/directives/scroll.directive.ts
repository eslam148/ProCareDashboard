import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScroll]',
  standalone: true
})
export class ScrollDirective {
  @Input() threshold = 100;
  @Output() scrollEnd = new EventEmitter<void>();
  @Output() scroll = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;

    this.scroll.emit(scrollPosition);

    if (scrollHeight - scrollPosition <= this.threshold) {
      this.scrollEnd.emit();
    }
  }
} 