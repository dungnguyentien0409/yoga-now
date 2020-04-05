import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private _prefix: string;
  set prefix(value: string) {
    this._prefix = value;
  }

  get prefix(): string {
    return this._prefix;
  }

  constructor() { }

  log(content, data) {
    console.log(`[${this.prefix}] - ${content}`, data);
  }
}
