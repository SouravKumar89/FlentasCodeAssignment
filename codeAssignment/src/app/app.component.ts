import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'codeAssignment';

  testCase:number;
  testCaseNumber:number;
  persNum =[];
  Results = [];
  personNumber = [];
  persCost = [];
  costs:any = [];

  submitTestCase(){
    if(!this.testCase || this.testCase<1){
        alert('please enter a number');
    }else if(this.testCase >10){
      alert("Test Case number can't be greater than 10");
    }
    else{
      this.testCaseNumber = this.testCase;
      for(var i = 0; i< this.testCaseNumber; i ++){
      }
      
    }
  }

  submitPerson(index){
    if(this.persNum[index]>0 && this.persNum[index] <= 100000)
        this.personNumber[index]= this.persNum[index];
    else{
       alert('please enter a number between 1 and 100000');
    }
  }


  submitCost(ind){
    if(!this.costs[ind])
        this.costs[ind]=[];
    if(ind < this.personNumber[ind] && this.persCost[ind]>0 && this.persCost[ind] <= 1000000){
      this.costs[ind].push(this.persCost[ind]);
      this.persCost[ind] = null;
    }
    else if(this.costs[ind] && this.costs[ind].length == this.personNumber[ind]){
       alert("Can't Add the number, Person number is full");
    }else{
      alert('please enter a number between 1 and 1000000');
    }
  }

  getnumberArray(length: number): Array<any> {
  if (length >= 0) {
    return new Array(length);
  }
}

GetResult(){
    let persNum = false;
      for(var i = 0; i< this.testCaseNumber; i ++){
          if((!this.personNumber[i] || this.persNum[i] > 100000) || this.costs[i].length < 1){
            persNum = true;
            break;
          }
      }

      if(persNum){
        alert("Please Enter All the Data");
        return;
      }else{
        this.generateOutPut();
      }
  }

  generateOutPut(){
     for(var i = 0; i< this.testCaseNumber; i ++){
        for(var j = 0; j< this.costs[i].length; j++){
          let personSort:any = this.costs[i].sort(function(a, b){return a-b});
          this.Results[i] = this.getTotal(personSort);
          console.log(this.Results);
        }
     }
  }

  getTotal(data){
    let a = data[0];
    let b = data[1];
    let c = data[2];
    let leftArray = [];
    let i =0;
    let rightArray = data;
    let total=0;
    while(rightArray.length>0){
      if(rightArray.length == 2){
        if(rightArray[1] >= rightArray[0]){
          total = total+rightArray[1];
        }else{
          total = total+rightArray[0];
        }
        rightArray = [];
      }
      else if(i == 0){
        total = a+ b;
        leftArray.push(data[1]);
      }else if (2*b >= a+c){
        total= total+c+a;
        leftArray.push(c);
      }else if(2*b < a+c){
        let leftMin = Math.min(...leftArray);
        total = total + rightArray[rightArray.length-1] + leftMin;
        leftArray = leftArray.filter(item => {return item != Math.min(...leftArray)});
        leftArray.push(rightArray[rightArray.length-1]);
        leftArray.push(rightArray[rightArray.length-2]);
        rightArray.push(leftMin);
      }

      if(i > 1){
        c= data[i+1];
      }
      if(rightArray.length> 0)
        rightArray = data.filter(item =>{ return leftArray.indexOf(item)<0})
      i = i+1;      
    }
    return total;
  }

  Refresh(){
    this.testCase=null;
    this.testCaseNumber= null;
    this.persNum =[];
    this.Results = [];
    this.personNumber = [];
    this.persCost = [];
    this.costs = [];
  }
}
