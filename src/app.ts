//Decorators
function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
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

  //Handles the submit and is later bound using configure
  @autobind //adds autobind decorator
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputEl.value)
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