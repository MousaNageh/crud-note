import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Get data from Local storage
  getLocal(key: string): any {
    const tahalofKey = 'key-' + key;
    const data = window.localStorage.getItem(tahalofKey);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  // set data into Local storage
  setLocal(key: string, value: any): void {
    const tahalofKey = 'key-' + key;
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(tahalofKey, data);
  }

  /* Remove All Locals Except User Lang */

  removeAllLocals(): void {
    for (const key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        window.localStorage.removeItem(key);
      }
    }
  }
}
