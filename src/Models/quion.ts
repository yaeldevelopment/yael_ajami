import { answer } from "./answer";

export class quions { 
     
    constructor( 
        public  question:String,public  id?:String,public answers?:Array<answer>){
   this.id=question;
   this.question=question;
   this.answers=answers;
    }

    
}
