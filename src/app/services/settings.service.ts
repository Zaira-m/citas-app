import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

const KEY_DELETE_ON_HOME = 'delete_on_home';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  async setDeleteOnHome(value: boolean): Promise<void> {
    await Preferences.set({
      key: KEY_DELETE_ON_HOME,
      value: JSON.stringify(value),
    });
  }

  async getDeleteOnHome(): Promise<boolean> {
    const { value } = await Preferences.get({ key: KEY_DELETE_ON_HOME });

    if (value === null) return false;

    try {
      return JSON.parse(value) as boolean;
    } catch {
      return false;
    }
  }
}
