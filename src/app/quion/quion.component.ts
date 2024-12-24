import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { AnswerComponent } from "../answer/answer.component";
import { answer } from '../../Models/answer';
import { SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-quion',
  standalone: true,
  imports: [CommonModule, AnswerComponent],
  templateUrl: './quion.component.html',
  styleUrl: './quion.component.scss'
})
export class QuionComponent implements OnChanges,AfterViewInit {
@Input()
quion:String="";
@Input()
answers:answer[] |null=[];
@Input()
id:String | null="";
isThinking: boolean = false;  // האם הרובוט חושב

question: string = "איך אתה מעדיף להתחיל את היום שלך?";
constructor(private cdr: ChangeDetectorRef) {
  this.isThinking = false;
}
ngAfterViewInit() {
  this.isThinking = false;
}
dots: boolean[] = [false, false, false];  // מייצג את 3 הנקודות
ngOnChanges(changes: SimpleChanges): void {
  if (changes['quion'] || changes['answers']) {
    this.startThinking();
  }
}

// פונקציה שמדמה חשיבה של הרובוט

private subscription: Subscription | null = null;

startThinking() {
  this.isThinking = true;
  let step = 0;
  this.subscription?.unsubscribe();
  this.subscription = interval(1000).subscribe(() => {
    step = (step + 1) % 4;
    this.dots = [step > 0, step > 1, step > 2];
    if (step === 0) {
      this.isThinking = false;
      this.subscription?.unsubscribe();
    }
  });
}
}
