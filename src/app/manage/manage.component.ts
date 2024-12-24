import { Component } from '@angular/core';
import { QuionService } from '../service/quion.service';
import { QuionComponent } from "../quion/quion.component";
import { AnswerComponent } from "../answer/answer.component";
import {quions}  from "../../Models/quion";
import { CommonModule, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule,QuionComponent, AnswerComponent,JsonPipe ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {
 
  arr_quion:quions[]=[];
  currentValue:quions[] =[];
constructor(private serv:QuionService){
 this.serv.currentValue$.subscribe((value) => {
      this.currentValue = value;
    });

}
ngOnInit(): void {
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

}
