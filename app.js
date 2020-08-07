function add(n1, n2, showResult, phrase) {
    if (showResult) {
        console.log(phrase + (n1 + n2));
    }
    return n1 + n2;
}
;
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
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
