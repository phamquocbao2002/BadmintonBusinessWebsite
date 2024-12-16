// content.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contentRouterSubject = new BehaviorSubject<string>('/home-page-content');
  contentRouter$ = this.contentRouterSubject.asObservable();

  constructor() {
    const storedRouter = sessionStorage.getItem('contentRouter');
    if (storedRouter) {
      this.contentRouterSubject.next(storedRouter);
    }
  }

  setContentRouter(value: string) {
    sessionStorage.setItem('contentRouter', value);
    this.contentRouterSubject.next(value);
  }
}
