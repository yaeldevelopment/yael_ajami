import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { answer } from '../../Models/answer';
import {FormsModule} from '@angular/forms';
import { quions } from '../../Models/quion';
import { QuionService } from '../service/quion.service';
@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [JsonPipe,FormsModule],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent implements OnInit  {
  @Input()
  answers:answer[]=[];
  @Input()
  id:String |undefined=undefined;
  quions:quions[]=[];
  quions_current:quions[]=[];

  constructor(private serv:QuionService){
    
  }
  ngOnInit(): void {
  this.serv.getAllLocally().subscribe((value) => {
    this.quions = value;
  });
  this.serv.currentValue$.subscribe((value) => {
    this.quions_current = value;
  });
  
}
  selectedOptions: answer | null = null;
  updateSharedValue(newValue:quions[]): void {
    // עדכון הערך המשותף דרך השירות
    this.serv.updateValue(newValue);
  }
  select_answer(){
    document.getElementsByClassName("error_"+this.id)[0].classList.add("hide");  
  }
  send_answar(event: MouseEvent){  

    if(!this.selectedOptions){
      document.getElementsByClassName("error_"+this.id)[0].classList.remove("hide");
      return;
    }

    console.log(    document.getElementsByClassName("error_"+this.id))
     const sendIcons = document.getElementsByClassName("send-icon"); 
        if (sendIcons) {
      Array.from(sendIcons)[0].remove();
    }
    if(this.selectedOptions?.profession){
      this.quions_current.push(  new quions(`המקצוע המתאים ביותר עבורך הוא: ${this.selectedOptions?.profession} בהתחשב בתשובתך`))
    }
    else{
      this.quions_current.push( this.quions.filter(x=>{return x.id==this.selectedOptions?.next_question_id})[0])
    }

    this.updateSharedValue(this.quions_current)

  }
}
