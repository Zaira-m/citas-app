import { Injectable } from '@angular/core';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotes: Quote[] = [
    { id: 1, phrase: 'La disciplina supera la motivación.', author: 'Anónimo' },
    { id: 2, phrase: 'Hazlo con miedo, pero hazlo.', author: 'Anónimo' },
    { id: 3, phrase: 'Lo simple bien hecho vale oro.', author: 'Anónimo' },
  ];

  private nextId = 4;

  getRandom(): Quote {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  getAll(): Quote[] {
    return [...this.quotes];
  }

  add(phrase: string, author: string) {
    const newQuote: Quote = { id: this.nextId++, phrase, author };
    this.quotes.unshift(newQuote); // la deja arriba
  }

  remove(id: number) {
    this.quotes = this.quotes.filter(q => q.id !== id);
  }
}
