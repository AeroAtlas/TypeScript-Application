function add(n1:number, n2:number, showResult: boolean, phrase: string) {
  if (showResult) {
    console.log(phrase + (n1 + n2))    
  }
  return n1 + n2;
};

// let number0: number; number0 = 20;
// let number00; number00 = '20';
const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: '

add(number1, number2, printResult, resultPhrase);







// const button = document.querySelector("button");
// const input1 = document.getElementById("num1")! as HTMLInputElement;//type castaing
// const input2 = document.getElementById("num1")! as HTMLInputElement;
// /*! means will always find an element*/

// function add(num1: number, num2: number) {
//   return num1 + num2;
// };

// button.addEventListener("click", function () {
//   console.log(add(+input1.value, +input2.value)); //+ converts to number
// })
