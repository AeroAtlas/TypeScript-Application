/// <reference path="base-components.ts" />
/// <reference path="../decorators/autobind.ts" /> 
/// <reference path="../util/validation.ts" /> 
/// <reference path="../state/project-state.ts" /> 

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
}