import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonButton
} from '@ionic/angular/standalone';

import { QuotesService } from '../services/quotes';
import { Quote } from '../models/quote';
import { QuoteCardComponent } from '../components/quote-card/quote-card.component';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,          //  necesario para *ngIf
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,             // necesario para ion-button
    QuoteCardComponent
  ],
})
export class HomePage {
  randomQuote!: Quote;
  canDelete = false;

  constructor(
    private quotesService: QuotesService,
    private settingsService: SettingsService
  ) {
    this.loadRandom();
  }

  // se ejecuta cada vez que se entra a Inicio
  async ionViewWillEnter() {
    this.canDelete = await this.settingsService.getDeleteOnHome();
  }

  loadRandom() {
    this.randomQuote = this.quotesService.getRandom();
  }

  deleteRandom() {
    if (!this.randomQuote) return;

    
    this.quotesService.remove(this.randomQuote.id);
    this.loadRandom();
  }
}
