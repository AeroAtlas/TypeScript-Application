type NumStr = number | string;
type Convert = 'as-number' | 'as-text'

function combine(
  input1: NumStr,
  input2: NumStr,
  resultType: Convert){
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as-number'){
    result = +input1 + +input2;
  }
    result = input1.toString() + input2.toString()
  if (resultType === 'as-number') {
    return +(result)
  } else {
    return result.toString
  }
};

type Product = { title: string; price: number; };
const p1: Product = { title: 'Abook', price: 12.99 }

type User = { name: string } | string;
let u1: User = { name: 'Max' };
u1 = 'Michael'

const combinedStringAges = combine('30', '26', 'as-number');
const combinedAges = combine(30, 26, "as-number");
const combinedNames = combine('Max', 'Anna', "as-text");