import {Injectable} from '@angular/core';


@Injectable()
export class LocalStorageService {

  constructor() {
  }

  read(key: string): string {
    const text: string = localStorage.getItem(key);

    if (text === null || typeof (text) === undefined || text === 'undefined') {
      return null;
    } else {
      return text;
    }
  }

  readObject<T>(key: string): T {
    const text = this.read(key);
    let data: T;

    try {
      data = <T> JSON.parse(text);
    } catch (e) {
      data = null;
    }
    return data;
  }

  write(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  writeObject(key: string, data: any): void {
    const text = JSON.parse(data);
    this.write(key, data);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
