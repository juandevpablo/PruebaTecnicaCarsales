import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public serializeParams(obj: any): string {
    const params: string[] = [];

    Object.keys(obj).forEach((p) => {
      params.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    });

    if (!params.join('&')) {
      return ''
    }
    return '?' + params.join('&');
  }
}
