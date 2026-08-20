import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-item.html',
  styleUrl: './accordion-item.css'
})
export class AccordionItemComponent {
  @Input() title: string = '';
  @Input() itemId: string = '';
  @Input() isOpen: boolean = false;
  @Input() isCompleted: boolean = true;
  @Input() isSummary: boolean = false;

  @Output() toggle = new EventEmitter<string>();

  onHeaderClick(): void {
    this.toggle.emit(this.itemId);
  }
}