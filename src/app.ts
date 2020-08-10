//Drag & Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

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
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  //Add listener functions to array
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  //Turn this class into a singleton
  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState();
    return this.instance;
  }


  //Add project object to the projects list
  public addProject(title:string, desc: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  //Move project using state to switch enum value
  public moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  //Updates the listeners
  private updateListeners() {
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


//Parent Class Component
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    //Get Template and Host Elements and add their ID
    this.templateEl = <HTMLTemplateElement>document.getElementById(templateId)!;
    this.hostEl = <T>document.getElementById(hostId)!;

    //Get contents of the Template and create an element with an id
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <U>importedNode.firstElementChild;
    if(newElementId){
      this.element.id = `${newElementId}`;
    }

    //Run the methods
    this.attach(insertAtStart);
  }

  //Attach the list data to the project list
  private attach(insertStart: boolean) {
    this.hostEl.insertAdjacentElement(
      //Insert after the begining or before the end
      insertStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  //Other methods
  abstract configure(): void;
  abstract renderContent(): void;
}

//Child Classes
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;
  
  get persons() {
    if (this.project.people === 1) {
      return '1 person'
    } else {
      return `${this.project.people} people`
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
  
    this.configure();
    this.renderContent();
  }

  @autobind //bind this for the dragstart
  dragStartHandler(event: DragEvent) {
    //Transfer data of the text and id and then move item after drop
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind //bind this for the dragend
  dragEndHandler(_event: DragEvent) {
    console.log('DragEnd');
  }

  //Listens to the drag events
  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  //Render the individual project values in the list
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}


class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  assignedProj: Project[];

  constructor(private type: 'active' | 'finished') { //literal union type
    //Get the element for the output and our host
    super('project-list','app',false,`${type}-projects`);
    this.assignedProj = [];

    //Run methods including ones in parent class
    this.configure();
    this.renderContent();
  }

  //Permits location of drop
  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  };
  //Reacts to Drop
  @autobind
  dropHandler(event: DragEvent){
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
    console.log(prjId)
  };
  //Reverts drop for failed drop
  @autobind
  dragLeaveHandler(_event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  };

  public configure() {
    //Add listener for dragging
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
    
    //Add listener to the global state
    projectState.addListener((projects: Project[]) => {
      const relevantProj = projects.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.Finished
      })
      this.assignedProj = relevantProj
      this.renderProjects();
    });
  }

  public renderContent() {
    //Create Id to dynamically append to the unordered list and add Title to h2
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'
  }
  
  private renderProjects() {
    const listEl = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = '';
    for (const projItem of this.assignedProj) {
      new ProjectItem(this.element.querySelector('ul')!.id, projItem)
    }
    // //Append the most recent post to the list
    // const projItem = this.assignedProj[this.assignedProj.length - 1];
    // //Create new ProjectItem object and render it through methods
    // if (projItem != null) {
    //   new ProjectItem(this.element.querySelector('ul')!.id, projItem)
    // }
  }

}


class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
  titleInputEl: HTMLInputElement; //HTMLElement
  descInputEl: HTMLInputElement; //HTMLElement
  peopleInputEl: HTMLInputElement; //HTMLElement
  errorNum: number = 0;
  constructor() {
    super('project-input','app', true, 'user-input');

    //Get the title,desc,& people fields from the template element
    this.titleInputEl = <HTMLInputElement>this.element.querySelector('#title');
    this.descInputEl = <HTMLInputElement>this.element.querySelector('#description');
    this.peopleInputEl = <HTMLInputElement>this.element.querySelector('#people');

    //Run the methods
    this.configure();
  }

  //Add listener to our form and binds it to our submithandler
  public configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  public renderContent() {
    // Nothing
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

}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');