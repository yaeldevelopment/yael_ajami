import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, tap } from 'rxjs';
import {quions}  from "../../Models/quion";
@Injectable({
  providedIn: 'root'
})
export class QuionService {
  private sharedValue = new BehaviorSubject<quions[]>([]);
  currentValue$ = this.sharedValue.asObservable(); // חשיפה כ-Observable

  private all_quions = new BehaviorSubject<quions[]>([]);
  quions$ = this.all_quions.asObservable(); // חשיפה כ-Observable
  constructor(private http:HttpClient) { 
   
  }
  updateValue(newValue: quions[]): void {
    this.sharedValue.next(newValue);
  }

  update_all_quions(newValue: quions[]): void {
    this.all_quions.next(newValue);
  }

  fetchAllQuions(): Observable<quions[]> {
    return this.http.get<quions[]>('https://server-robot.onrender.com/quion').pipe(
   
      tap((data) => {this.all_quions.next(data);  }), // עדכון הנתונים ב-BehaviorSubject
      shareReplay(1) // מנגנון לשמירה על תוצאות הקריאה ב-caching
    );
  }

  // גישה לנתונים מקומיים
  getAllLocally(): Observable<quions[]> {
    return this.quions$;
  }
  getcurrentValue(): Observable<quions[]> {
    return this.currentValue$;
  }
}
