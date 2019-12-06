import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  title = '';

  constructor() {
  }

  changeTitleName(title: string) {
    this.title = title;
    return this.title;
  }
}
