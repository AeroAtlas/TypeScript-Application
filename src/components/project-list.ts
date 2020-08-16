/// <reference path="base-components.ts" />
/// <reference path="../decorators/autobind.ts" /> 
/// <reference path="../state/project-state.ts" /> 
/// <reference path="../models/project-model.ts" /> 
/// <reference path="../models/drag-drop.ts" /> 

namespace App {
  //Child Class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
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
    }

  }
}