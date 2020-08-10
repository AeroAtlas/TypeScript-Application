//Project Type
enum ProjectStatus { Active, Finished };

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

//State Management
type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[]= [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    
  }

  //Turn this class into a singleton
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  //Add listener functions to array
  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  //Add project object to the projects list
  addProject(title:string, desc: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      //make new reference for each listener (slice())
      listenerFn(this.projects.slice()); 
    }
  }
}

//Global State
const projectState = ProjectState.getInstance();


//Validation
interface Validator {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validator) {
  let isValid = true;
  //Exists Check
  if (input.required) { 
    isValid = isValid && input.value.toString().trim().length !== 0 
  }//Minimum Length Check
  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length >= input.minLength
  }//Maxium Length Check
  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length <= input.maxLength
  }//Minimum Value Check
  if (input.min != null && typeof input.value == 'number') {
    isValid = isValid && !!(input.value >= input.min)
  }//Maximum Value Check
  if (input.max != null && typeof input.value === 'number') {
    isValid = isValid && !!(input.value <= input.max)
  }//Return True or False 
  return isValid;
}


//Binding
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
class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;
  assignedProj: Project[];
  constructor(private type: 'active' | 'finished') { //literal union type
    //Get the element for the output and our host
    this.templateEl = <HTMLTemplateElement>document.getElementById('project-list')!;
    this.hostEl = <HTMLDivElement>document.getElementById('app')!;
    this.assignedProj = [];

    //Get the content of the template and add the user input id to it
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <HTMLElement>importedNode.firstElementChild;
    this.element.id = `${this.type}-projects`;

    //Add listener to the global state
    projectState.addListener((projects: Project[]) => {
      this.assignedProj = projects
      this.renderProj();
    });

    //Run methods
    this.attach();
    this.renderList();
  }

  private renderProj() {
    const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
    this.assignedProj.map(prjItem => {
      const listItem = document.createElement('li')
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem)
    })
  }

  private renderList() {
    //Create Id to dynamically append to the unordered list and add Title to h2
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'
  }

  //Attach the list data to the project list
  private attach() {
    this.hostEl.insertAdjacentElement('beforeend', this.element);
  }

}


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

    //Run the methods
    this.configure();
    this.attach();
  }

  //Get all user input and return a union type of either tuple or void
  private getUserInput(): [string,string,number] | void {
    const getTitle = this.titleInputEl.value
    const getDesc = this.descInputEl.value
    const getPeople = +this.peopleInputEl.value

    //Create validatable objects 
    const titleValidate: Validator = {
      value: getTitle,
      required: true,
      minLength: 5,
      maxLength: 20
    }
    const descValidate: Validator = {
      value: getDesc,
      required: true,
      minLength: 5,
      maxLength: 100
    }
    const peopleValidate: Validator = {
      value: getPeople,
      required: true,
      min: 1,
      max: 5
    }

    //Reset the error output
    var x = document.querySelectorAll('#error-output');
    for(var i in x){
        x[i].parentNode?.removeChild( x[i] );
    }
    //ICheck for validation
    if (!validate(titleValidate) || !validate(descValidate) || !validate(peopleValidate)) {
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
      this.errorNum = 0;
      return [getTitle,getDesc, +getPeople]
    }
  }

  //Clear the input fields
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
      //Deconstruct the tuple
      const [title, desc, people] = userInput; 
      //Add the project to the global state
      projectState.addProject(title, desc, people);
      //Clear form inputs
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
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');