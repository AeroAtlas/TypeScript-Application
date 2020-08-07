const userName = 'Bob';
console.log(userName);
const button = document.querySelector('button');
////const button = document.querySelector('button')!;

function add(n1: number, n2: number): number | void {
  if (n1 + n2 > 0) {
    return n1 + n2
  }
  return;
}

function clickHandler(message: string) {
  console.log('Clicked! ' + message)
}

if (button) {
  button.addEventListener('click', clickHandler.bind(null, 'You\'re welcome'))
}


// let userInput: unknown;
// let userName: string | number;


// userInput = 5;
// userInput = "bob";
// if (typeof userInput === 'string') {
//   userName = userInput;
// }

// // function generateError(message: string, code: number): never {
// //   throw { message: message, errorCode: code };
// //   //while(true) {} 
// // }

// // generateError('An error occured!', 500)

// type NumStr = number | string;
// type Convert = 'as-number' | 'as-text'

// function combine(
//   input1: NumStr,
//   input2: NumStr,
//   resultType: Convert){
//   let result;
//   if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number'){
//     result = +input1 + +input2;
//   }
//     result = input1.toString() + input2.toString()
//   if (resultType === 'as-number') {
//     return +(result)
//   } else {
//     return result.toString
//   }
// };

// type Product = { title: string; price: number; };
// const p1: Product = { title: 'Abook', price: 12.99 }

// type User = { name: string } | string;
// let u1: User = { name: 'Max' };
// u1 = 'Michael'

// const combinedStringAges = combine('30', '26', 'as-number');
// const combinedAges = combine(30, 26, "as-number");
// const combinedNames = combine('Max', 'Anna', "as-text");