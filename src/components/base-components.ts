namespace App {
  //Parent Class Component
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}