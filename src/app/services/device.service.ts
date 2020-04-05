import { Injectable } from '@angular/core';
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  isMobile() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
