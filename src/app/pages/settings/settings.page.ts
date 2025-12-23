import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonToggle
} from '@ionic/angular/standalone';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonToggle,
    CommonModule,
    FormsModule
  ]
})
export class SettingsPage implements OnInit {

  deleteOnHome = false;

  constructor(private settingsService: SettingsService) { }

  async ngOnInit() {
    // Cargar preferencia guardada al iniciar la vista
    this.deleteOnHome = await this.settingsService.getDeleteOnHome();
  }

  async onToggleChange(ev: CustomEvent) {
    const value = (ev.detail as any).checked as boolean;
    this.deleteOnHome = value;
    await this.settingsService.setDeleteOnHome(value);
  }
}
