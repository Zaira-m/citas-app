import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonText
} from '@ionic/angular/standalone';

import { SqliteService } from '../../services/sqlite';
import { Quote } from '../../models/quote';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonText,
    QuoteCardComponent
  ],
})
export class QuotesPage {
  phrase = '';
  author = '';
  quotes: Quote[] = [];

  constructor(private sqliteService: SqliteService) {}

  //  Ciclo de vida (puntos de la rúbrica)
  async ionViewWillEnter() {
    await this.sqliteService.init();
    await this.load();
  }

  async load() {
    this.quotes = await this.sqliteService.getQuotes();
  }

  async addQuote() {
    const p = this.phrase.trim();
    const a = this.author.trim();

    //  Validaciones solicitadas
    if (p.length < 5 || a.length < 2) {
      return;
    }

    await this.sqliteService.addQuote(p, a);

    this.phrase = '';
    this.author = '';

    await this.load();
  }

  async deleteQuote(id: number) {
    await this.sqliteService.deleteQuote(id);
    await this.load();
  }
}

