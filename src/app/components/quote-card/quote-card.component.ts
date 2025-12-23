import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular/standalone';
import { Quote } from '../../models/quote';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton],
})
export class QuoteCardComponent {
  @Input() quote!: Quote;

  // Para Home (nueva cita aleatoria)
  @Output() newQuote = new EventEmitter<void>();

  // Para Citas (eliminar desde el hijo)
  @Output() delete = new EventEmitter<number>();

  onNewQuoteClick() {
    this.newQuote.emit();
  }

  onDeleteClick() {
    this.delete.emit(this.quote.id);
  }
}
