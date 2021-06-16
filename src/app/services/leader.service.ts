/*
import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  espera:number = 2000;

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(LEADERS), this.espera)
    // });
    return of(LEADERS).pipe(delay(this.espera)).toPromise();
  }

  getFeaturedLeader(): Promise<Leader> {
    // return new Promise(resolve => {
    //   //simular latencia servidor con 2 sg de espera
    //   setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), this.espera)
    // });
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(this.espera)).toPromise();
  }
}
*/

import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  espera:number = 2000;

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(this.espera));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(this.espera));
  }
}
