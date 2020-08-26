//Custom Type
type AddFnType = (a: number, b: number) => number;
//Interface 
interface AddFn {
  //anonymous function
  (a: number, b: number): number;
}
let add: AddFn;
add = (n1:number, n2:number) => {return n1+n2}
//Interfaces
interface Named {
  readonly name: string;
  outputName?: string; //optional property
}
interface Greetable extends Named {
  greet(phrase: string): void;
  goodbye?(phrase: string): void;
}
interface Age {
  age: number;
}

//can implement multiple interfaces using comma
class Person implements Greetable, Age {
  name: string;
  outputName?: string;
  age: number;

  constructor(n: string, a: number, o?:string) {
    if(o){
      this.outputName = o; 
    }
    this.age = a;
    this.name = n;
  }

  greet(phrase: string) {
    if (this.outputName) {
      console.log(`${phrase} ${this.outputName} ${this.age} ${this.name}`)
    }
    console.log(phrase + ' ' +this.age+ this.name)
  }

  
}

//Custom type (can use union types)
type Person2 = {
  readonly name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Greetable;

user1 = new Person('Bob', 22)

user1.greet('Hi there - I am');

//optional! => myMethod?(){...}