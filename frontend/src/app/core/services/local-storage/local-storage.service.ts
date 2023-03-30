import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Get data from Local storage
  getLocal(key: string): any {
    const prefix = 'key-' + key;
    const data = window.localStorage.getItem(prefix);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  // set data into Local storage
  setLocal(key: string, value: any): void {
    const prefix = 'key-' + key;
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(prefix, data);
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
