import { Component } from "./base-components.js";
import { Draggable } from '../models/drag-drop.js';
import { autobind } from "../decorators/autobind.js";
import { Project } from "../models/project-model.js"

//Child Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
