/*
import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  espera:number = 2000;
  
  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(PROMOTIONS), this.espera)
    // });
    return of(PROMOTIONS).pipe(delay(this.espera)).toPromise();
  }

  getPromotion(id: string): Promise<Promotion> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), this.espera)
    // });
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(this.espera)).toPromise();
  }

  getFeaturedPromotion(): Promise<Promotion> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), this.espera)
    // });
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(this.espera)).toPromise();
  }
  
}
*/

import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  espera:number = 2000;
  
  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(this.espera));
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(this.espera));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(this.espera));
  }
  
}
