//Decorators
function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      //Binds this to all incoming methods
      const boundFn = originalMethod.bind(this)
      return boundFn;
    }
  };
  return adjDescriptor;
}


//Classes
class ProjectInput {
  templateEl: HTMLTemplateElement; //HTMLElement
  hostEl: HTMLDivElement; //HTMLElement
  element: HTMLFormElement; //HTMLElement
  titleInputEl: HTMLInputElement; //HTMLElement
  descInputEl: HTMLInputElement; //HTMLElement
  peopleInputEl: HTMLInputElement; //HTMLElement
  errorNum: number = 0;

  constructor() {
    //Get the element for the template and tag we will be hosting our data on
    this.templateEl = <HTMLTemplateElement>document.getElementById('project-input')!;
    this.hostEl = document.getElementById('app')! as HTMLDivElement; //alt way to type cast

    //Get the content of the template and add the user input id to it
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <HTMLFormElement>importedNode.firstElementChild;
    this.element.id = 'user-input';

    //Get the title,desc,& people fields from the template element
    this.titleInputEl = <HTMLInputElement>this.element.querySelector('#title');
    this.descInputEl = <HTMLInputElement>this.element.querySelector('#description');
    this.peopleInputEl = <HTMLInputElement>this.element.querySelector('#people');

    this.configure();
    this.attach();
  }

  //Get all user input and return a union type of either tuple or void
  private getUserInput(): [string,string,number] | void {
    const getTitle = this.titleInputEl.value
    const getDesc = this.descInputEl.value
    const getPeople = this.peopleInputEl.value

    //Reset the error output
    var x = document.querySelectorAll('#error-output');
    for(var i in x){
        x[i].parentNode?.removeChild( x[i] );
    }
    //If any of the length are 0
    if (!getTitle.trim().length || !getDesc.trim().length || !getPeople.trim().length) {
      //Increment the error number 
      this.errorNum++;
      //Create error-ouput and child text node and append to error-handle
      const grand = document.getElementById('error-handle');
      const para = document.createElement('p')
      para.setAttribute('id', 'error-output')
      const node = document.createTextNode(`Invalid input for one or more fields ${[this.errorNum]}`);
      para?.appendChild(node)
      grand?.appendChild(para)
      return;
      //throw new Error('Invalid input for one or more fields')
    } else {
      return [getTitle,getDesc, +getPeople]
    }
  }

  //Clear the inputfields
  private clearInputs() {
    this.titleInputEl.value = '';
    this.descInputEl.value = '';
    this.peopleInputEl.value = '';
  }

  //Handles the submit and is later bound using configure
  @autobind //adds autobind decorator
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    //Check if its a tuple(js array) or void
    if (Array.isArray(userInput)){
      //deconstruct the tuple
      const [title, desc, people] = userInput; 
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  //Add listener to our form and binds it to our submithandler
  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  //Attach the input data to the host element
  private attach() {
    this.hostEl.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput(); 