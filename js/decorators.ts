function Logger(logString: string) { //runs when defined
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

//Extends and replaces old class so it only renders name when instantiated
function WithTemplate(template: string, hookId: string) {
  return <T extends { new(...args: any[]): {name:string}}>(OGconstructor: T) => { //generic + new(any args)
    return class extends OGconstructor {
      constructor(..._: any[]) {//only renders when instantiated with new return & _ blank value
        super(); //calls original 
        console.log('Rendering tempalte');
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  } 
}

//Decorators go from top to bottom, but return their values bottom to top
@Logger('Logging - A Person')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class APerson {
  name: string = 'Bob';

  constructor() {
    console.log('Creating person object...')
  }
}

const pers = new APerson();
console.log(pers);

// ---
//property decorator (var)
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property Decorator')
  console.log(target, propertyName)
}
//accessor decorator (function for accessability)
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
  console.log('Accessor Decorator!')
  console.log(target) //where its being run (constructor/class)
  console.log(name) //What its called
  console.log(descriptor) //What it specifically is (setter, getter, etc)
}
//method decorator (method)
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method Decorator!')
  console.log(target) //where its being run (constructor/class)
  console.log(name) //Get name of the method its in
  console.log(descriptor) //What it specifically is (setter, getter, etc)
  //return to change the method
}
//parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator!')
  console.log(target) //where its being run (constructor/class)
  console.log(name) //What its called
  console.log(position) //its position in the parameters
}

//Decorators run when class is defined not at runtime
class Product {
  //Log1 can return but typescript will ignore
  @Log //executes when you describe the property to Typescript
  public title: string
  
  @Log2//can use return. accessor
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid Price')
    }
  }
  constructor(t: string, private _price: number) {
    this.title = t;
  }
  @Log3 //can use return. method
  getPriceWithTax(@Log4 tax: number) {//Log4 can return but typescript will ignore
    return this._price * (1+tax)
   }
}

const p1 = new Product('Book', 298)

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() { //like a value property
      const boundFn = originalMethod.bind(this); //this is for whatever triggers getter
      return boundFn; //overwrites this in originalMethod
    }
  };
  return adjDescriptor; //overwrites old descriptor
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  };
};

const p = new Printer();
p.showMessage(); //this now works with autobind, but auto

const button = document.querySelector('button')!;
//addEventListener uses this of the event. bind lets you change it to something else
button.addEventListener('click', p.showMessage);//this now works with autobind

interface Teach {
  title: string;
  price: number;
}

interface ValidatorConfig {
  [property: string]: { //class name and then object
    [validatableProp: string]: string[] //['required', 'positive']
  }
}
//Holds registerd Validators
const registeredValidators: ValidatorConfig = {};

//Validation logic
function RequiredStr(target: any, propName: string) {
  //get constructor inside target for course name
  registeredValidators[target.constructor.name] = { 
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'] //currently overwrites existing course names
  };
}
function PositiveNum(target: any, propName: string) {
  registeredValidators[target.constructor.name] = { 
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'] //currently overwrites existing course names
  };
}
/* Correct way, but doesn't work
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
  };
} */


function Validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]){
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]; //!!turns truthy value to true and vice versa 
          break;
        case 'positive':
          isValid = isValid && (obj[prop] > 0);
          break;
      }
    }
  }
  return isValid;
}

class Course implements Teach{
  @RequiredStr
  title: string;
  @PositiveNum
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value;
  const price = +priceEl.value; //+ converts to number

  const createdCourse = new Course(title, price);
  if (!Validate(createdCourse)) {
    throw new Error('Doesn\'t meet requirements')
  }
  console.log(createdCourse)
});