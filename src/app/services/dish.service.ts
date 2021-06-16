/*
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  espera:number = 2000;

  constructor() { 
    console.log('service arrancado!');
  }

  getDishes(): Promise<Dish[]> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(DISHES), this.espera)
    // });
    return of(DISHES).pipe(delay(this.espera)).toPromise();
  }

  getDish(id: string): Promise<Dish> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), this.espera)
    // });
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(this.espera)).toPromise();
  }

  getFeaturedDish(): Promise<Dish> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), this.espera)
    // });
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(this.espera)).toPromise();
  }
}
*/

import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  espera:number = 2000;

  constructor() { 
    console.log('service arrancado!');
  }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(this.espera));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(this.espera));
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(this.espera));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id));
  }

}
