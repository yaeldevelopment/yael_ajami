import { Component } from '@angular/core';
import { QuionService } from '../service/quion.service';
import { QuionComponent } from "../quion/quion.component";
import { AnswerComponent } from "../answer/answer.component";
import {quions}  from "../../Models/quion";
import { CommonModule, JsonPipe } from '@angular/common';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule,QuionComponent, AnswerComponent,JsonPipe ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {
  isThinking: boolean = false;  // האם הרובוט חושב
  arr_quion:quions[]=[];
  currentValue:quions[] =[];

constructor(private serv:QuionService){
  
 this.serv.currentValue$.subscribe((value) => {
  this.isThinking=true;
 this.stopThinking();
      this.currentValue = value;

    });

}
ngOnInit(): void {this.startThinking();
  // מבצע קריאה לשרת פעם אחת ומעדכן את הרשימה
  this.serv.fetchAllQuions().subscribe((data) => {
    
    this.currentValue?.push(data[0]);
    this.arr_quion=data
    this.updateSharedValue(this.currentValue);
  });
  this.serv.getcurrentValue().subscribe((data) => {

    this.currentValue = data;
  });
  

}
updateSharedValue(newValue:quions[]): void {
  // עדכון הערך המשותף דרך השירות
  this.serv.updateValue(newValue);
}
dots: boolean[] = [false, false, false];  // מייצג את 3 הנקודות
private subscription: Subscription | null = null;
startThinking() {
  let step = 0;

  // ודא שהקודם מופסק
  this.subscription?.unsubscribe();

  // צור subscription חדש
  this.subscription = interval(200).subscribe(() => {
    step = (step + 1) % 4;
    this.dots = [step > 0, step > 1, step > 2];
  });
}

stopThinking() {
  // הפסק את ה-subscription
  this.subscription?.unsubscribe();
  this.subscription = null;
}
}
